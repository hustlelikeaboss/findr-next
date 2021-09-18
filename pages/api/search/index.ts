import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import Scraper from '~/lib/theme-scraper';
import Platform from '~/lib/theme-scraper/Platform';

import TemplateRepo, { Template } from '~/data/repositories/Template';
import TemplateFamilyRepo, { TemplateFamily } from '~/data/repositories/TemplateFamily';
import SearchRepo, { Website } from '~/data/repositories/Website';
import CustomerRepo, { Customer } from '~/data/repositories/Customer';

import { reqQueryToInt, reqQueryToStr } from '~/lib/api-helpers';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		body: { url: urlInput, size, page },
	} = req;

	if (!urlInput) {
		res.status(400).json({ errors: [{ message: 'url is not provided.' }] });
	}

	let url = reqQueryToStr(urlInput);
	try {
		if (!/^https?:\/\//.test(url)) {
			url = 'http://' + url;
		}
		url = new URL(url).origin;
	} catch (err) {
		res.status(400).json(err?.message);
	}

	try {
		// track searched website
		const website = (await SearchRepo.findOneByUrl(url)) as Website;
		if (!website) {
			SearchRepo.create({ url, searchTimes: 1 });
		} else {
			SearchRepo.update({ ...website, searchTimes: website.searchTimes + 1 });
		}

		// handle free tier customers
		const { email } = (await getSession({ req }))?.user || {};
		if (!email) {
			res.status(401).send('User not logged in.');
			return;
		}
		const { customerId, searchTimes, priceId } = ((await CustomerRepo.findOneByEmail(email)) ||
			{}) as Customer;
		if (!customerId) {
			res.status(403).send('User not subscribed.');
			return;
		}
		if (
			priceId === process.env.PLAN_FREE &&
			searchTimes === parseInt(process.env.MONTHLY_SEARCH_QUOTA)
		) {
			res.status(402).send('User exceeded monthly search quota.');
			return;
		}
		CustomerRepo.updateByCustomerId({ customerId, searchTimes: searchTimes + 1 });

		// handle search
		switch (method) {
			case 'POST':
				let details = await new Scraper(url).scrape();

				const { platform, themeId: templateFamilyId } = details;
				if (platform === Platform.SQUARESPACE) {
					const templateFamily = (await TemplateFamilyRepo.findOneByFamilyId(
						templateFamilyId
					)) as TemplateFamily;
					if (!templateFamily) {
						details.isCustom = true;
					}

					details.searchTimes = templateFamily.searchTimes || 1;
					details.themeName = templateFamily.templateFamilyName;

					const templates = (await TemplateRepo.findMany({
						where: { templateFamilyId },
						size: reqQueryToInt(size),
						page: reqQueryToInt(page),
					})) as Template[];
					details.templates = templates;
				}

				res.status(200).json(details);
				break;
			default:
				res.setHeader('Allow', ['POST']);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (err) {
		console.error(err);
		res.status(err?.status || 500).json(err?.message);
	}
};

import type { NextApiRequest, NextApiResponse } from 'next';
import Scraper from '~/lib/theme-scraper';
import Platform from '~/lib/theme-scraper/Platform';
import TemplateRepo, { Template } from '~/data/repositories/Template';
import TemplateFamilyRepo, { TemplateFamily } from '~/data/repositories/TemplateFamily';
import SearchRepo, { Website } from '~/data/repositories/Website';
import { reqQueryToInt, reqQueryToStr, toJsonErrors } from '~/lib/utils';

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
		res.status(400).json(toJsonErrors(err));
	}

	try {
		const search = (await SearchRepo.findOneByUrl(url)) as Website;
		if (!search) {
			SearchRepo.create({ url, searchTimes: 1 });
		} else {
			SearchRepo.update({ ...search, searchTimes: search.searchTimes + 1 });
		}

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
		res.status(err?.status || 500).json(toJsonErrors(err));
	}
};

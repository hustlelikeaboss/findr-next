import type { NextApiRequest, NextApiResponse } from 'next';
import TemplateFamilyRepo from '../../../data/repositories/TemplateFamily';
import { reqQueryToInt } from '../../../lib';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		body,
		query: { size, page },
	} = req;

	try {
		switch (method) {
			case 'GET':
				res
					.status(200)
					.json(
						await TemplateFamilyRepo.findMany({
							size: reqQueryToInt(size),
							page: reqQueryToInt(page),
						})
					);
				break;
			case 'POST':
				res.status(200).json(await TemplateFamilyRepo.create(body));
				break;
			default:
				res.setHeader('Allow', ['GET', 'POST']);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (err) {
		console.error(err);
		res.status(err?.status || 500).json(err?.message);
	}
};

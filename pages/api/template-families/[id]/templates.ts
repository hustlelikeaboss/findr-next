import type { NextApiRequest, NextApiResponse } from 'next';
import TemplateRepo from '~/data/repositories/Template';
import { reqQueryToInt, reqQueryToStr } from '~/lib/api-helpers';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		query: { id, size, page },
	} = req;

	const where = reqQueryToInt(id)
		? { id: reqQueryToInt(id) }
		: { templateFamilyId: reqQueryToStr(id) };

	try {
		switch (method) {
			case 'GET':
				res.status(200).json(
					await TemplateRepo.findMany({
						size: reqQueryToInt(size),
						page: reqQueryToInt(page),
						where,
					})
				);
				break;
			default:
				res.setHeader('Allow', ['GET']);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (err) {
		console.error(err);
		res.status(err?.status || 500).json(err?.message);
	}
};

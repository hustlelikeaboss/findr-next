import type { NextApiRequest, NextApiResponse } from 'next';
import TemplateFamilyRepo from '../../../data/repositories/TemplateFamily';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		query: { id },
		method,
		body,
	} = req;

	try {
		switch (method) {
			case 'GET':
				const data = await TemplateFamilyRepo.findOne(id);
				res.status(data ? 200 : 404).json(data);
				break;
			case 'PUT':
				res.status(200).json(await TemplateFamilyRepo.update(body));
				break;
			case 'DELETE':
				res.status(204).json(await TemplateFamilyRepo.delete(id));
				break;
			default:
				res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (err) {
		console.error(err);
		res.status(err?.status || 500).json(err?.message);
	}
};

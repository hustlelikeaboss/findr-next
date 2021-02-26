import { log } from 'console';
import TemplateRepo from '../../../data/entities/Template';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
		body,
	} = req;

	try {
		switch (method) {
			case 'GET':
				const data = await TemplateRepo.findOne(id);
				res.status(data ? 200 : 404).json(data);
				break;
			case 'PUT':
				res.status(200).json(await TemplateRepo.update(body));
				break;
			case 'DELETE':
				res.status(204).json(await TemplateRepo.delete(id));
				break;
			default:
				res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (err) {
		console.error(err);
		res.status(err?.status || 500).json(err?.message);
	}
}

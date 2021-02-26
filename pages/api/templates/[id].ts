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
				res.status(200).json(await TemplateRepo.findOne(id));
				break;
			case 'PUT':
				res.status(200).json(await TemplateRepo.update(body));
				break;
			case 'DELETE':
				res.status(200).json(await TemplateRepo.delete(id));
				break;
			default:
				res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (err) {
		res.status(500).json(err);
	}
}

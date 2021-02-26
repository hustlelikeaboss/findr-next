import TemplateRepo from '../../data/entities/Template';

export default async function handler(req, res) {
	const { method, body } = req;

	try {
		switch (method) {
			case 'GET':
				res.status(200).json(await TemplateRepo.findAll());
				break;
			case 'POST':
				res.status(200).json(await TemplateRepo.create(body));
				break;
			default:
				res.setHeader('Allow', ['GET', 'POST']);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (err) {
		res.status(500).json(err);
	}
}

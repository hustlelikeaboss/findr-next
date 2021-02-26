import type { NextApiRequest, NextApiResponse } from 'next';
import SearchRepo from '../../../data/repositories/Search';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req;

	try {
		switch (method) {
			case 'GET':
				res.status(200).json(await SearchRepo.findAll());
				break;
			case 'POST':
				res.status(200).json(await SearchRepo.create(body));
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

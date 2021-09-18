import type { NextApiRequest, NextApiResponse } from 'next';
import CustomerRepo from '~/data/repositories/Customer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		query: { email },
		method,
	} = req;

	try {
		switch (method) {
			case 'GET':
				const data = await CustomerRepo.findOneByEmail(email as string);
				if (data) {
					res.status(200).json(data);
				} else {
					res.status(404).json(`Customer with email ${email} not found`);
				}
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

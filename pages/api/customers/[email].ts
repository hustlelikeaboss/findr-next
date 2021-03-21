import type { NextApiRequest, NextApiResponse } from 'next';
import CustomerRepo from '~/data/repositories/Customer';
import { reqQueryToInt, toJsonErrors } from '~/lib/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		query: { email },
		method,
	} = req;

	try {
		switch (method) {
			case 'GET':
				const data = await CustomerRepo.findOneByEmail(email as string);
				res.status(data ? 200 : 404).json(data);
				break;
			default:
				res.setHeader('Allow', ['GET']);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (err) {
		console.error(err);
		res.status(err?.status || 500).json(toJsonErrors(err));
	}
};

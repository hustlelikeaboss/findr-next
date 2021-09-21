import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import CustomerRepo, { Customer } from '~/data/repositories/Customer';
import initServerStripe from '~/lib/stripe/server-side';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	try {
		switch (method) {
			case 'GET':
				const { email } = (await getSession({ req }))?.user;

				let message = '';
				if (!email) {
					message = `User not logged in`;
					console.debug(message);
					res.status(401).send(message);
				}

				const { customerId } = (await CustomerRepo.findOneByEmail(email)) as Customer;
				if (!customerId) {
					message = `User with ${email} not subscribed`;
					console.debug(message);
					res.status(403).send(message);
				}

				// redirect link from the portal.
				const returnUrl = `${process.env.VERCEL_URL}/subscription`;

				const { url } = await initServerStripe().billingPortal.sessions.create({
					customer: customerId,
					return_url: returnUrl,
				});

				res.status(200).send({
					url,
				});
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

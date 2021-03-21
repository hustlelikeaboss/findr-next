import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'next-auth/jwt';

import CustomerRepo, { Customer } from '~/data/repositories/Customer';
import initServerStripe from '~/lib/stripe/server-side';
import { toJsonErrors } from '~/lib/utils';

const secret = process.env.SECRET;
type SessionUser = {
	name?: string;
	email?: string;
	picture?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	try {
		switch (method) {
			case 'GET':
				const { email } = (await jwt.getToken({ req, secret })) as SessionUser;

				let message = '';
				if (!email) {
					message = `User not authenticated`;
					console.debug(message);
					res.status(403).send(message);
				}

				const { customerId } = (await CustomerRepo.findOneByEmail(email)) as Customer;

				if (!customerId) {
					message = `Email ${email} not associated with any customer`;
					console.debug(message);
					res.status(404).send(message);
				}

				// redirect link from the portal.
				const returnUrl = `${process.env.DOMAIN}/subscription`;

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
		res.status(err?.status || 500).json(toJsonErrors(err));
	}
};

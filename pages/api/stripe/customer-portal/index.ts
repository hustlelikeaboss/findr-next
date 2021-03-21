import type { NextApiRequest, NextApiResponse } from 'next';
import { toJsonErrors } from '~/lib/utils';

import Stripe from 'stripe';

// DOC: https://github.com/stripe/stripe-node#configuration
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: null,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		body: { email, customerId },
	} = req;

	try {
		switch (method) {
			case 'POST':
				if (!customerId) {
					res.status(404).send(`Email ${email} not associated with any customer`);
				}

				// This is the url to which the customer will be redirected when they are done
				// managing their billing with the portal.
				const returnUrl = `${process.env.DOMAIN}/subscription`;

				const portalsession = await stripe.billingPortal.sessions.create({
					customer: customerId,
					return_url: returnUrl,
				});

				res.status(200).send({
					url: portalsession.url,
				});
				break;
			default:
				res.setHeader('Allow', ['POST']);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (err) {
		console.error(err);
		res.status(err?.status || 500).json(toJsonErrors(err));
	}
};

import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	// https://github.com/stripe/stripe-node#configuration
	apiVersion: null,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { customerId, status } = req.query;
	try {
		if (!(customerId as string).startsWith('cu')) {
			throw Error('Incorrect Customer ID.');
		}
		const { data: subscriptions } = await stripe.subscriptions.list({
			customer: customerId as string,
			status: status as Stripe.SubscriptionListParams.Status,
		});
		res.status(200).json(subscriptions);
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
}

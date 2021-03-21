import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	// https://github.com/stripe/stripe-node#configuration
	apiVersion: null,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const id: string = req.query.id as string;
	try {
		if (!id.startsWith('sub_')) {
			throw Error('Incorrect Subscription ID.');
		}
		const subscription: Stripe.Subscription = await stripe.subscriptions.retrieve(id);
		res.status(200).json(subscription);
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
}

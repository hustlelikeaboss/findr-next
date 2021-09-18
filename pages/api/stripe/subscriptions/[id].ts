import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import initServerStripe from '~/lib/stripe/server-side';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const id: string = req.query.id as string;
	try {
		if (!id.startsWith('sub_')) {
			throw Error('Incorrect Subscription ID.');
		}
		const subscription: Stripe.Subscription = await initServerStripe().subscriptions.retrieve(id);
		res.status(200).json(subscription);
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
}

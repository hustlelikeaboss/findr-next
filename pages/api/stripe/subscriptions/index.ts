import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import initServerStripe from '~/lib/stripe/server-side';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { customerId, status } = req.query;
	try {
		if (!(customerId as string).startsWith('cu')) {
			throw Error('Incorrect Customer ID.');
		}
		const { data: subscriptions } = await initServerStripe().subscriptions.list({
			customer: customerId as string,
			status: status as Stripe.SubscriptionListParams.Status,
		});
		res.status(200).json(subscriptions);
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
}

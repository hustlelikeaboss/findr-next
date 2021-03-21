import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import initServerStripe from '~/lib/stripe/init-stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { priceId, email, customerId } = req.body;
		if (!(email || customerId)) {
			res.status(403).end();
		}
		try {
			// DOC: https://stripe.com/docs/api/checkout/sessions/create
			const params: Stripe.Checkout.SessionCreateParams = {
				...{
					mode: 'subscription',
					payment_method_types: ['card'],
					line_items: [
						{
							price: priceId,
							quantity: 1,
						},
					],
					success_url: `${req.headers.origin}/subscription?session_id={CHECKOUT_SESSION_ID}`,
					cancel_url: `${req.headers.origin}/subscribe`,
				},
				// can only send one of the two, use existing customerId if exists
				...(customerId ? { customer: customerId } : { customer_email: email }),
			};

			const checkoutSession: Stripe.Checkout.Session = await initServerStripe().checkout.sessions.create(
				params
			);

			res.status(200).json(checkoutSession);
		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}

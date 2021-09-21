import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';
import { buffer } from 'micro';
import Cors from 'micro-cors';

import CustomerRepo, { Customer } from '~/data/repositories/Customer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	// https://github.com/stripe/stripe-node#configuration
	apiVersion: null,
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe requires the raw body to construct the event.
export const config = {
	api: {
		bodyParser: false,
	},
};

const cors = Cors({
	allowMethods: ['POST', 'HEAD'],
});

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const buf = await buffer(req);
		const sig = req.headers['stripe-signature']!;

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
		} catch (err) {
			// On error, log and return the error message.
			console.log(`❌ Error message: ${err.message}`);
			res.status(400).send(`Webhook Error: ${err.message}`);
			return;
		}

		// Successfully constructed event.
		console.log('✅ Success:', event.id);

		// Cast event data to Stripe object.
		if (event.type === 'payment_intent.succeeded') {
			const paymentIntent = event.data.object as Stripe.PaymentIntent;
			console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
		} else if (event.type === 'payment_intent.payment_failed') {
			const paymentIntent = event.data.object as Stripe.PaymentIntent;
			console.log(`❌ Payment failed: ${paymentIntent.last_payment_error?.message}`);
		} else if (event.type === 'charge.succeeded') {
			const charge = event.data.object as Stripe.Charge;
			console.log(`💵 charge.succeeded: ${charge.id}`);
		} else if (event.type === 'customer.created') {
			const customer = event.data.object as Stripe.Customer;
			console.log(`💵 customer.created: ${customer.id}`);
			try {
				CustomerRepo.create({
					email: customer.email,
					customerId: customer.id,
				});
			} catch (e) {
				console.log('e: ', e);
			}
		} else if (event.type === 'customer.updated') {
			const customer = event.data.object as Stripe.Customer;
			console.log(`💵 customer.updated: ${customer.id}`);
			try {
				const customerInDB = await CustomerRepo.findOneByEmail(customer.email);
				if (!customerInDB) {
					console.log(`💵 customer doesn't existing in database, creating`);
					CustomerRepo.create({
						email: customer.email,
						customerId: customer.id,
						...subscriptionToCustomer(customer.subscriptions?.[0]),
					});
				} else {
					CustomerRepo.updateByCustomerId({
						id: customerInDB.id,
						email: customer.email,
						customerId: customer.id,
						...subscriptionToCustomer(customer.subscriptions?.[0]),
					});
				}
			} catch (e) {
				console.log('e: ', e);
			}
		} else if (event.type === 'checkout.session.completed') {
			const session = event.data.object as Stripe.Checkout.Session;
			console.log(`💵 checkout.session.completed: ${session.id}`);
		} else if (event.type === 'customer.subscription.created') {
			const subscription = event.data.object as Stripe.Subscription;
			console.log(`💵 subscription.created: ${subscription.id}`);
			try {
				CustomerRepo.updateByCustomerId(subscriptionToCustomer(subscription));
			} catch (e) {
				console.log('e: ', e);
			}
		} else if (event.type === 'customer.subscription.updated') {
			const subscription = event.data.object as Stripe.Subscription;
			console.log(`💵 subscription.updated: ${subscription.id}`);
			try {
				CustomerRepo.updateByCustomerId(subscriptionToCustomer(subscription));
			} catch (e) {
				console.log('e: ', e);
			}
		} else if (event.type === 'customer.subscription.deleted') {
			const subscription = event.data.object as Stripe.Subscription;
			console.log(`💵 subscription.deleted: ${subscription.id}`);
			try {
				CustomerRepo.updateByCustomerId(subscriptionToCustomer(subscription));
			} catch (e) {
				console.log('e: ', e);
			}
		} else if (event.type === 'customer.subscription.trial_will_end') {
			const subscription = event.data.object as Stripe.Subscription;
			console.log(`💵 subscription.trial_will_end: ${subscription.id}`);
			// TODO: send email reminder?
		} else {
			console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
		}

		// Return a response to acknowledge receipt of the event.
		res.json({ received: true });
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
};

function subscriptionToCustomer(subscription?: Stripe.Subscription): Partial<Customer> {
	if (!subscription) return {};
	return {
		customerId: subscription.customer as string,
		subscriptionId: subscription.id,
		priceId: subscription.items.data[0].price.id,
		productId: subscription.items.data[0].price.product as string,
		status: subscription.status,
	};
}

export default cors(webhookHandler as any);

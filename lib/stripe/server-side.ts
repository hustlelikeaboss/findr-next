import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SECRET_KEY) {
	throw new Error('STRIPE_SECRET_KEY not set');
}

/**
 * initialize server side Stripe instance
 *
 * DOC: https://github.com/stripe/stripe-node#configuration
 */
let stripe: Stripe;
const initServerStripe = () => {
	if (!stripe) {
		stripe = new Stripe(STRIPE_SECRET_KEY, {
			apiVersion: null,
		});
	}
	return stripe;
};

export default initServerStripe;

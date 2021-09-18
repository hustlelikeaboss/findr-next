import { Stripe, loadStripe } from '@stripe/stripe-js';

const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
	throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY not set');
}

/**
 * initialize client side Stripe instance
 *
 * DOC: https://stripe.com/docs/js/initializing
 */
let stripePromise: Promise<Stripe | null>;
const loadClientStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
	}
	return stripePromise;
};

export default loadClientStripe;

/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { Stripe, loadStripe } from '@stripe/stripe-js';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) {
	throw new Error('Stripe publishable key not set');
}

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
	if (!stripePromise) {
		stripePromise = loadStripe(publishableKey);
	}
	return stripePromise;
};

export default getStripe;

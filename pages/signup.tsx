import React, { CSSProperties, useCallback, useState } from 'react';
import { useSession } from 'next-auth/client';

import loadClientStripe from '~/lib/stripe/client-side';
import { safePost } from '~/lib/api-helpers';
import useCustomer from '~/hooks/customer';

export default function SignUp() {
	return (
		<main>
			<Plans />
		</main>
	);
}

export type Plan = {
	level: number;
	name: string;
	features: string[];
	cost: number;
	stripePriceId?: string;
	highlighted?: boolean;
};

export const plans: Plan[] = [
	{
		level: 1,
		stripePriceId: process.env.NEXT_PUBLIC_PLAN_FREE,
		name: 'Genin',
		features: ['10 searches a month'],
		cost: 0,
	},
	{
		level: 2,
		stripePriceId: process.env.NEXT_PUBLIC_PLAN_BASIC,
		name: 'Chuunin',
		features: ['Unlimited searches'],
		cost: 2.99,
		highlighted: true,
	},
	{
		level: 3,
		stripePriceId: process.env.NEXT_PUBLIC_PLAN_PREMIUM,
		name: 'Jounin',
		features: [
			'Unlimited searches',
			'Template identification based on computer vision',
			'Personal library with favorites, categories, tags, and notes',
		],
		cost: 4.99,
	},
];

export function Plans({ style }: { style?: CSSProperties }) {
	return (
		<div className='py-5 bg-light' style={style}>
			<div className='container py-5 my-5'>
				<div className='row py-3'>
					<div className='col text-center'>
						<h2 className='display-4 mb-3'>Pick a plan that works for you</h2>
						<p className='lead text-secondary mb-5 pb-3 mx-5'>
							We've got something for every design ninja
						</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12 col-md-12 mx-lg-auto'>
						<div className='card-group'>
							{plans.map((p) => (
								<PlanCard plan={p} key={p.level} />
							))}
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col text-center'>
						<a className='btn text-secondary p-4' href='/features'>
							<i className='fa fa-clone mr-2'></i>
							<u>Learn more</u>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

function PlanCard({ plan }: { plan: Plan }) {
	const [session] = useSession();
	const [redirecting, setRedirecting] = useState<boolean>(false);
	const { customer, loading, error } = useCustomer();
	const subscribe = useCallback(async () => {
		if (loading) return;

		setRedirecting(true);
		const response = await safePost('/api/stripe/checkout-sessions', {
			priceId: plan.stripePriceId,
			email: session?.user?.email,
			customerId: customer?.customerId,
		});

		if (response.statusCode === 500) {
			console.error(response.message);
			return;
		}

		// Redirect to Checkout.
		const stripe = await loadClientStripe();
		const { error } = await stripe?.redirectToCheckout({
			sessionId: response.id,
		});

		if (error) {
			console.warn(error.message);
			setRedirecting(false);
		}
	}, [loading, plan, session, customer]);

	return (
		<div className='card mb-3 text-center' key={plan.level}>
			<div className='card-body'>
				<h5 className='text-secondary mt-3 mb-4'>
					{plan.name}
					{plan.highlighted && (
						<span className='badge badge-pill badge-secondary ml-2'>Popular</span>
					)}
				</h5>
				{plan.features.map((f, i) => (
					<p className='lead mb-3 text-secondary mx-4' key={i}>
						<i className='fas fa-check fa-xs text-success mr-2' />
						{f}
					</p>
				))}
			</div>
			<div className='card-footer bg-transparent border-0'>
				<div className='mb-5'>
					<span className='display-4'>{plan.cost ? `$${plan.cost}` : 'free'}</span>
					{plan.cost ? <span className='text-secondary'>&nbsp;/ month</span> : null}
				</div>
				<button
					className='btn btn-warning w-100 btn-lg mb-3'
					disabled={loading}
					onClick={subscribe}
				>
					{redirecting ? 'Redirecting' : 'Get started'}
				</button>
			</div>
		</div>
	);
}

import React from 'react';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import Stripe from 'stripe';

import { plans } from './signup';
import { Customer } from '~/data/repositories/Customer';
import { safeGet } from '~/lib/api-helpers';
import useCustomerPortal from '~/hooks/customer-portal';
import useCustomer from '~/hooks/customer';

export default function Subscription() {
	const { loading, error, customer } = useCustomer();
	const router = useRouter();

	if (loading) return <p>Loading</p>;

	if (!customer) {
		router.push(`/signup`);
		return;
	}

	return (
		<main className='container-fluid' id='hero-08' style={{ background: '#E3F4FC' }}>
			<div className='row' style={{ minHeight: '110vh' }}>
				<div
					className='col-lg-6 col-md-12'
					style={{
						background: `url('images/photo-41.jpg') center center no-repeat`,
						backgroundSize: 'cover',
						minHeight: '100vh',
					}}
				></div>
				<div className='col-lg-4 col-md-8 col-sm-12 py-5 m-auto'>
					<h2 className='text-center display-4 mb-5'>Subscription</h2>
					{/* 
					{loading ? (
						<p>Fetching your subscription from Stripe...</p>
					) : error ? (
						<p>Data fetch failed: {error.message}. Please try again later.</p>
					) : ( */}
					<>
						<SubscriptionDetails subscriptionId={customer?.subscriptionId} />

						<SubscriptionHistory customerId={customer?.customerId} />

						<ManageSubscription email={customer?.email} />
					</>
					{/* )} */}
				</div>
			</div>
		</main>
	);
}
export async function fetchCustomerByEmail(email: string): Promise<Customer> {
	if (!email) {
		return;
	}

	const res = await fetch(`/api/customers/${email}`);
	if (res.ok) {
		return res.json();
	}
	throw new Error(res.statusText);
}

function fetchAllSubscriptionsByCustomerId(customerId: string): Promise<Stripe.Subscription[]> {
	return fetchSubscriptions(customerId)('all');
}

function fetchActiveSubscriptionsByCustomerId(customerId: string): Promise<Stripe.Subscription[]> {
	return fetchSubscriptions(customerId)('active');
}
function fetchCustomerPortal(): Promise<{ url: string }> {
	return safeGet('/api/stripe/customer-portal');
}

async function fetchSubscriptionById(subscriptionId: string): Promise<Stripe.Subscription> {
	if (!subscriptionId) {
		return;
	}

	try {
		const res = await fetch(`/api/stripe/subscriptions/${subscriptionId}`);
		if (res.status != 200) {
			console.log('Error: ', res.statusText);
			return;
		}
		return res?.json();
	} catch (e) {
		console.log('e: ', e);
		return;
	}
}

const fetchSubscriptions = (customerId: string) => async (
	status?: string
): Promise<Stripe.Subscription[]> => {
	if (!customerId) {
		return;
	}

	try {
		const res = await fetch(
			`/api/stripe/subscriptions?customerId=${customerId}${status ? `&status=${status}` : ''}`
		);
		if (res.status != 200) {
			console.log('Error: ', res.statusText);
			return;
		}
		return res?.json();
	} catch (e) {
		console.log('e: ', e);
		return;
	}
};

function timestampToDateString(timestamp: number, fallback = ''): string {
	return timestamp ? new Date(timestamp * 1000).toLocaleDateString() : fallback;
}

function SubscriptionDetails({ subscriptionId }: { subscriptionId?: string }) {
	const { data: subscription, error: fetchSubscriptionByIdError } = useSwr(
		[subscriptionId, 'fetchSubscriptionById'],
		fetchSubscriptionById
	);

	const { manageSubscription, error: initCustomerPortalError } = useCustomerPortal();

	if (!subscriptionId) return null;
	if (fetchSubscriptionByIdError) return <div>Failed to load subscription details</div>;
	if (initCustomerPortalError) return <div>Failed to init customer portal</div>;
	if (!subscription) return <div>Loading</div>;

	const { status, start_date, trial_end } = subscription;

	return (
		<form method='POST' className='needs-validation' noValidate>
			<div className='form-row align-middle'>
				<div className='col-md-8 mb-3'>
					<label className='text-secondary' htmlFor='exampleFormControlSelect1'>
						<small>Current Plan</small>
						<i className='far fa-check-circle text-success pl-1' title={status}></i>
					</label>
					<div className='input-group'>
						<div className='input-group-prepend'>
							<span className='input-group-text' id='inputGroupPrepend'>
								<i className='far fa-user-circle'></i>
							</span>
						</div>
						<select
							className='form-control'
							id='exampleFormControlSelect1'
							aria-describedby='inputGroupPrepend'
							required
						>
							{plans.map((p) => (
								<option
									key={p.level}
									value={p.stripePriceId}
									selected={p.stripePriceId === subscription.items.data[0].price.id}
								>
									{p.name} - {p.cost ? `$${p.cost}` : 'free'}
								</option>
							))}
						</select>

						<button
							className='btn btn-warning rounded-0'
							type='button'
							onClick={manageSubscription}
						>
							Upgrade
						</button>
					</div>

					<p className='text-muted text-right'>
						<small>
							<i>
								{trial_end ? (
									<>
										trial ends <span>{timestampToDateString(trial_end)}</span>
									</>
								) : (
									<>
										since <span>{timestampToDateString(start_date)}</span>
									</>
								)}
							</i>
						</small>
					</p>
				</div>
			</div>
		</form>
	);
}

function SubscriptionHistory({ customerId }: { customerId?: string }) {
	const { data: subscriptions, error } = useSwr(
		[customerId, 'fetchActiveSubscriptionsByCustomerId'],
		fetchActiveSubscriptionsByCustomerId
	);

	if (!customerId) return null;
	if (error) return <div>Failed</div>;
	if (!subscriptions) return <div>Loading</div>;

	console.log('customer has', subscriptions.length, 'active subscriptions');

	return (
		<div className='mt-3'>
			<h5 className='text-muted'>Subscription History</h5>
			<hr />
			<table className='table table-hover text-center'>
				<thead>
					<tr>
						<th scope='col'>Plan</th>
						<th scope='col'>Status</th>
						<th scope='col'>Start Date</th>
						<th scope='col'>Current Period Ends</th>
						<th scope='col'>Cancelled At</th>
					</tr>
				</thead>
				<tbody style={{ lineHeight: '2.5em' }}>
					{subscriptions.map((s) => (
						<tr key={s.id}>
							<td>{plans.find((p) => p.stripePriceId === s.items.data[0].price.id)?.name}</td>
							<td>{s.status}</td>
							<td>{timestampToDateString(s.start_date, '--')}</td>
							<td>{timestampToDateString(s.current_period_end, '--')}</td>
							<td>{timestampToDateString(s.canceled_at, '--')}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function ManageSubscription({ email }: { email?: string }) {
	const { error, manageSubscription } = useCustomerPortal();
	if (error) return <p>Failed to init customer portal: {error?.toString()}</p>;

	return (
		<div className='mt-3'>
			<hr />
			<button className='btn btn-info float-right' type='button' onClick={manageSubscription}>
				Manage Subscription
			</button>
		</div>
	);
}

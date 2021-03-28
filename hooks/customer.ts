import { useSession } from 'next-auth/client';
import useSwr from 'swr';

import { Customer } from '~/data/repositories/Customer';
import { safeGet } from '~/lib/api-helpers';

export async function fetchCustomerByEmail(email: string): Promise<Customer> {
	if (!email) {
		return;
	}

	return safeGet(`/api/customers/${email}`);
}

export default function useCustomer() {
	const [session] = useSession();
	const email = session?.user?.email;

	const { data: customer, error, isValidating: loading } = useSwr<Customer>(
		[email, 'fetchCustomerByEmail'],
		fetchCustomerByEmail,
		{
			errorRetryCount: 0,
		}
	);

	return { error, loading, customer };
}

import { useCallback } from 'react';
import useSwr from 'swr';

import { safeGet } from '~/lib/api-helpers';

function fetchCustomerPortal(): Promise<{ url: string }> {
	return safeGet('/api/stripe/customer-portal');
}

export default function useCustomerPortal() {
	const { data, error } = useSwr(['fetchCustomerPortal'], fetchCustomerPortal);

	const manageSubscription = useCallback(
		(e) => {
			e.preventDefault();

			const customerPortalUrl = data?.url;
			if (!customerPortalUrl) return;

			window.location.href = customerPortalUrl;
		},
		[data]
	);

	return { error, manageSubscription };
}

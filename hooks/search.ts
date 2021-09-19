import React, { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import useCustomer from './customer';

export function useSearch() {
	const inputRef = useRef(null);
	const router = useRouter();
	const { customer } = useCustomer();

	const handleSubmit = useCallback(
		(evt: React.FormEvent<HTMLFormElement>) => {
			evt.preventDefault();

			if (customer?.status !== 'active') {
				router.push(`/signup`);
				return;
			}

			const url = inputRef?.current?.value;
			if (url) {
				inputRef?.current.blur();
				inputRef.current.value = '';

				router.push(`/results?url=${url}`);
			}
		},
		[customer, inputRef, router]
	);

	return {
		inputRef,
		handleSubmit,
	};
}

import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import useCustomer from './customer';

export function useSearch() {
	const inputRef = useRef(null);
	const router = useRouter();
	const { customer } = useCustomer();

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		if (!customer || customer.status !== 'paid') {
			router.push(`/signup`);
			return;
		}

		const url = inputRef?.current?.value;
		if (url) {
			router.push(`/results?url=${url}`);
		}
	};

	return {
		inputRef,
		handleSubmit,
	};
}

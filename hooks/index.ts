import React, { useRef } from 'react';
import { useRouter } from 'next/router';

export function useSearch() {
	const inputRef = useRef(null);
	const router = useRouter();

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		const url = inputRef?.current?.value;
		if (url) {
			router.push(`/results?url=${url}`);
		}
		evt.preventDefault();
	};

	return {
		inputRef,
		handleSubmit,
	};
}

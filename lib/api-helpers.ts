export function reqQueryToInt(query: string | string[]): number | undefined {
	let parsed: number;
	if (Array.isArray(query)) {
		parsed = Number(query?.[0]);
	} else {
		parsed = Number(query);
	}

	if (!isNaN(parsed)) {
		return parsed;
	}
}

export function reqQueryToStr(query: string | string[]): string {
	if (Array.isArray(query)) {
		return query?.[0];
	}
	return query;
}

export function toJsonErrors(error: any) {
	return {
		errors: [
			{
				status: error?.status || 500,
				message: error?.message || error?.toString() || 'unexpected error',
			},
		],
	};
}

export async function safeGet(url: string) {
	try {
		const data = await fetch(url).then((res) => res.json());
		return data;
	} catch (err) {
		throw new Error(err.message);
	}
}

export async function safePost(url: string, data: { [key: string]: any }) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data || {}),
		});
		return response?.json();
	} catch (err) {
		throw new Error(err.message);
	}
}

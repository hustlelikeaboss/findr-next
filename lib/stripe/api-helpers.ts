export async function safeGet(url: string) {
	try {
		const data = await fetch(url).then((res) => res.json());
		return data;
	} catch (err) {
		throw new Error(err.message);
	}
}

export async function safePost(url: string, data?: {}) {
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

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

export async function safeGet(url: string) {
	let res: Response;
	try {
		res = await fetch(url);
	} catch (err) {
		console.log('safeGet err: ', err?.message);
		throw new Error(err?.message);
	}

	if (res.ok) {
		return res.json();
	}
	throw new Error(await res?.text());
}

export async function safePost(url: string, data: { [key: string]: any }) {
	let res: Response;
	try {
		res = await fetch(url, {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
			referrerPolicy: 'no-referrer',
			body: JSON.stringify(data || {}),
		});
	} catch (err) {
		throw new Error(err?.message);
	}

	if (res.ok) {
		return res.json();
	}
	throw new Error(await res?.text());
}

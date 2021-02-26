export function reqQueryToInt(query: string | string[]): number | undefined {
	let parsed: number;
	if (Array.isArray(query)) {
		parsed = parseInt(query?.[0]);
	} else {
		parsed = parseInt(query);
	}

	if (!isNaN(parsed)) {
		return parsed;
	}
}

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

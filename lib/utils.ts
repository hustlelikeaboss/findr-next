export function splitArrByLength<T>(arr: T[], size: number): T[][] {
	const lenOf2DArr = Math.ceil(arr?.length / size) || 0;
	return new Array(lenOf2DArr).fill(1).map((_, i) => {
		const start = size * i;
		const end = size * (i + 1) > arr?.length ? arr?.length : size * (i + 1);
		return arr.slice(start, end);
	});
}

const ADJECTIVES = ['easiest', 'fastest', 'smartest', 'simplest', 'best', 'coolest'];
export function getRandomAdj() {
	const i = Math.floor(Math.random() * ADJECTIVES.length);
	return ADJECTIVES[i];
}

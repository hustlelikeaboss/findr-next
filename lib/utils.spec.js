import { splitArrByLength } from './utils';
describe('splitArrByLength', () => {
	it('should return empty array when input is null', () => {
		expect(splitArrByLength(null, 2)).toEqual([]);
	});
	it('should return empty array when input is empty', () => {
		expect(splitArrByLength([], 2)).toEqual([]);
	});

	it('should return correct 2D array when input arr is shorter than size', () => {
		expect(splitArrByLength([1], 2)).toEqual([[1]]);
	});

	it('should return correct 2D array when input arr is equal to size', () => {
		expect(splitArrByLength([1, 2], 2)).toEqual([[1, 2]]);
	});

	it('should return correct 2D array when input arr is greater than size', () => {
		expect(splitArrByLength([1, 2, 3], 2)).toEqual([[1, 2], [3]]);
	});
});

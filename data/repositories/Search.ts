import { Repository } from './Repository';

const TABLE = 'searches';

export type Search = {
	id: number;
	url: string;
	searchTimes: number;
};

class SearchRepo extends Repository<Search> {}

export default new SearchRepo(TABLE);

import { Repository } from './Repository';
import { TableName } from '../tables';

export type Search = {
	id: number;
	url: string;
	searchTimes: number;
};

class SearchRepo extends Repository<Search> {}

export default new SearchRepo(TableName.SEARCHES);

import psql from '../client';

import { Repository } from './Repository';
import { TableName } from '../tables';

export type Search = {
	id: number;
	url: string;
	searchTimes: number;
};

class SearchRepo extends Repository<Search> {
	async findOneByUrl(url: string) {
		return psql
			.from(this.table)
			.where(psql.e.like`url`(url))
			.one();
	}
}

export default new SearchRepo(TableName.SEARCHES);

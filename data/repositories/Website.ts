import psql from '../client';

import { Repository } from './Repository';
import { TableName } from '../tables';

export type Website = {
	id: number;
	url: string;
	searchTimes: number;
};

class WebsiteRepo extends Repository<Website> {
	async findOneByUrl(url: string) {
		return psql
			.from(this.table)
			.where(psql.e.like`url`(url))
			.one();
	}
}

export default new WebsiteRepo(TableName.WEBSITES);

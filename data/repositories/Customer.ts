import psql from '../client';

import { Repository } from './Repository';
import { TableName } from '../tables';

export type Customer = {
	id: number;
	email: string;
	customerId: string;
	subscriptionId?: string;
	priceId?: string;
	productId?: string;
	status?: string;
};

class CustomerRepo extends Repository<Customer> {
	async findOneByEmail(email: string) {
		return psql.from(this.table).where({ email }).one();
	}
	async findOneByCustomerId(customerId: string) {
		return psql.from(this.table).where({ customerId }).one();
	}
	async updateByCustomerId(input: Partial<Customer>) {
		const { customerId, id, ...updatableFields } = input;
		return psql.from(this.table).set(updatableFields).where({ customerId }).return('*');
	}
}

export default new CustomerRepo(TableName.CUSTOMERS);

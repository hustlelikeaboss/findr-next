import psql from '../client';

export class Ider {
	readonly id: number;
}

export class Repository<T extends Ider> {
	table: string;

	constructor(table: string) {
		this.table = table;
	}
	async findOne(id: number) {
		return psql.from(this.table).where({ id: id }).one();
	}

	async findMany(size = 5, page = 1) {
		return psql
			.from(this.table)
			.limit(size)
			.offset((page - 1) * size)
			.all();
	}

	async create(input: T) {
		return psql.from(this.table).insert(input).return('id');
	}

	async update(input: T) {
		const { id, ...updatableFields } = input;
		return psql.from(this.table).set(updatableFields).where({ id }).return('*');
	}

	async delete(id: number) {
		return psql.from(this.table).delete().where({ id: id }).return();
	}
}

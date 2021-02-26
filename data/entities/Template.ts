import psql from '../client';

const TABLE = 'templates';

export type Template = {
	id: number;
	templateFamilyId: string;
	templateName: string;
	templateUrl: string;
	templateStatus: string;
	templateGuide: string;
	description: string;
	imageUrl: string;
};

export default {
	async findOne(id: number) {
		return psql.from(TABLE).where({ id: id }).one();
	},

	async findAll() {
		return psql.from(TABLE).all();
	},

	async create(template: Template) {
		return psql.from(TABLE).insert(template).return('id');
	},

	async update(template: Template) {
		const {
			id,
			templateFamilyId,
			templateName,
			templateUrl,
			templateStatus,
			templateGuide,
			description,
			imageUrl,
		} = template;
		return psql
			.from(TABLE)
			.set({
				templateFamilyId,
				templateName,
				templateUrl,
				templateStatus,
				templateGuide,
				description,
				imageUrl,
			})
			.where({ id })
			.return('id');
	},

	async delete(id: number) {
		return psql.from(TABLE).delete().where({ id: id }).return();
	},
};

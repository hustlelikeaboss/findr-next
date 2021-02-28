import psql from '../client';

import { Repository } from './Repository';
import { TableName } from '../tables';

export type TemplateFamily = {
	id: number;
	templateFamilyId: string;
	templateFamilyName: string;
	userGuide: string;
	searchTimes: number;
};

class TemplateFamilyRepo extends Repository<TemplateFamily> {
	async findOneByFamilyId(id: string) {
		return psql.from(this.table).where({ templateFamilyId: id }).one();
	}
}

export default new TemplateFamilyRepo(TableName.TEMPLATE_FAMILIES);

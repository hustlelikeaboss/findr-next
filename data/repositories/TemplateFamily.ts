import { Repository } from './Repository';
import { TableName } from '../tables';

export type TemplateFamily = {
	id: number;
	templateFamilyId: string;
	templateFamilyName: string;
	userGuide: string;
	searchTimes: number;
};

class TemplateFamilyRepo extends Repository<TemplateFamily> {}

export default new TemplateFamilyRepo(TableName.TEMPLATE_FAMILIES);

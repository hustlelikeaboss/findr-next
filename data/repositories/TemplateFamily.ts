import { Repository } from './Repository';

const TABLE = 'template_families';

export type TemplateFamily = {
	id: number;
	templateFamilyId: string;
	templateFamilyName: string;
	userGuide: string;
	searchTimes: number;
};

class TemplateFamilyRepo extends Repository<TemplateFamily> {}

export default new TemplateFamilyRepo(TABLE);

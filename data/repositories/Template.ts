import { Repository } from './Repository';
import { TableName } from '../tables';

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

class TemplateRepo extends Repository<Template> {}

export default new TemplateRepo(TableName.TEMPLATES);

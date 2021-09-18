import useSwr from 'swr';
import { TemplateFamily } from '~/data/repositories/TemplateFamily';

export async function fetchTemplateFamilyById(id: number | string): Promise<TemplateFamily> {
	if (!id) {
		return;
	}

	const res = await fetch(`/api/template-families/${id}`);
	return res.json();
}

export default function TemplateFamilyLink({ id }: { id: number | string }) {
	const { data: templateFamily, error } = useSwr<TemplateFamily>([id], fetchTemplateFamilyById);
	if (error) return <div>failed</div>;
	if (!templateFamily) return <div>Loading</div>;
	return (
		<a href={`/template-families/${id}`}>
			<span className='badge badge-secondary'>{templateFamily.templateFamilyName}</span>
		</a>
	);
}

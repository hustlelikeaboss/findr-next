import useSwr from 'swr';
import { useRouter } from 'next/router';

import { WebsiteDetails } from '~/lib/theme-scraper/parser';
import TemplateGrid from '~/components/TemplateGrid';
import Platform from '~/lib/theme-scraper/Platform';
import { TemplateFamily } from '~/data/repositories/TemplateFamily';
import { Template } from '~/data/repositories/Template';
import { SquarespaceTemplateFamilyStats } from '../results';

export default function TemplateFamilyPage() {
	const router = useRouter();
	const { id } = router.query;
	const { data: details, error } = useSwr<WebsiteDetails>([id], loadTemplateFamilyData);

	return (
		<main style={{ minHeight: '80vh' }}>
			<div className='bg-light pt-5'>
				<div className='container d-flex flex-column py-5'>
					<div className='row my-auto my-5 pt-5'>
						{error ? (
							<div className='mt-5'>Failed to load website details: {error?.toString()}</div>
						) : !details ? (
							<div className='mt-5'>Loading...</div>
						) : (
							<div className='col-lg-8 col-md-10 col-sm-12 mx-auto text-center text-dark'>
								<h1 className='mb-3 font-weight-normal display-3'>{details?.themeName}</h1>

								<div>
									<p className='lead mt-5'>{/* description */}</p>
									<SquarespaceTemplateFamilyStats
										searchTimes={details?.searchTimes}
										numOfTemplates={details?.templates?.length}
									/>
								</div>

								<div className='text-right mb-3'>
									<a
										className='btn btn-lg btn-outline-dark'
										href={details?.themeUrl}
										target='_blank'
									>
										User Guide<i className='fa fa-angle-right ml-2'></i>
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<TemplateGrid templates={details?.templates} />
		</main>
	);
}

async function loadTemplateFamilyData(id: string): Promise<WebsiteDetails> {
	const family = await loadTemplateFamily(id);
	const templates = await loadTemplatesInFamily(id);
	return {
		searchTimes: family.searchTimes,
		themeId: family.templateFamilyId,
		themeName: family.templateFamilyName,
		platform: Platform.SQUARESPACE,
		themeUrl: family.userGuide,
		isCustom: false,
		templates,
	};
}

async function loadTemplateFamily(id: string): Promise<TemplateFamily> {
	if (!id) {
		return;
	}

	const res = await fetch(`/api/template-families/${id}`, {
		cache: 'force-cache',
	});
	return res.json();
}

async function loadTemplatesInFamily(id: string, page = 1, size = 60): Promise<Template[]> {
	if (!id) {
		return;
	}

	const res = await fetch(`/api/template-families/${id}/templates?page=${page}&size=${size}`, {
		cache: 'force-cache',
	});
	return res.json();
}

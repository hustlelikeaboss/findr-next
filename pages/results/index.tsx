import useSwr from 'swr';
import { useRouter } from 'next/router';

import { WebsiteDetails } from '../../lib/theme-scraper/parser';
import TemplateGrid from '../../components/TemplateGrid';
import Platform from '../../lib/theme-scraper/Platform';

export default function Results() {
	const router = useRouter();
	const { url, page = 1, size = 6 } = router.query;

	const { data: details, error } = useSwr<WebsiteDetails>([url, page, size], scapeWebsite);

	return (
		<main style={{ minHeight: '80vh' }}>
			<div className='bg-light pt-5'>
				<div className='container d-flex flex-column py-5'>
					<div className='row my-auto my-5 pt-5'>
						<div className='col-lg-8 col-md-10 col-sm-12 mx-auto text-center text-dark'>
							<h1 className='mb-3 font-weight-normal display-3'>Search results</h1>
							<p className='lead text-secondary'>
								For{' '}
								<a href={`${url}`} className='text-muted' target='_blank' rel='noopener noreferrer'>
									{url}
								</a>
							</p>
							{error ? (
								<div className='mt-5'>Failed to load website details</div>
							) : !details ? (
								<div className='mt-5'>Loading...</div>
							) : (
								<TemplateFamilyStats details={details} />
							)}
						</div>
					</div>
				</div>
			</div>

			<TemplateGrid templates={details?.templates} />
		</main>
	);
}

async function scapeWebsite(url: string, page: number, size: number) {
	if (!url) {
		return;
	}

	const res = await fetch('/api/search', {
		method: 'POST',
		mode: 'same-origin',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify({
			url,
			page,
			size,
		}),
	});
	return res.json();
}

function TemplateFamilyStats({ details }: { details: WebsiteDetails }) {
	return (
		<>
			{details.platform === Platform.SQUARESPACE ? (
				<div className='mt-5'>
					{details.isCustom ? (
						<p>
							This is a <b>Squarespace</b> website, but no template information has been found. My
							guess is, it's custom-designed.
						</p>
					) : (
						<>
							<p>
								This <b>Squarespace</b> website is using a template in the{' '}
								<a href={`/template-families/${details.themeId}`}>
									<b>{details.themeName}</b>
								</a>{' '}
								family.
							</p>
							<div className='col-lg-6 col-md-8 col-sm-12 mx-auto text-center pt-2 pb-3'>
								<ul className='list-unstyled text-secondary text-lg-left'>
									<li className='pb-1'>
										<i className='fas fa-user-friends mr-2'></i>This family contains{' '}
										<b>{details.templates?.length}</b> templates;
									</li>
									<li className='pb-1'>
										<i className='fas fa-search mr-3'></i>It has been searched{' '}
										<b>{details.searchTimes}</b> times;
									</li>
									<li className='pb-1'>
										<i className='fab fa-hotjar mr-3'></i>It's popularity index is <b>9</b> (out of
										10).
									</li>
								</ul>
							</div>
						</>
					)}
				</div>
			) : (
				<div className='mt-5'>
					{details.platform === Platform.WORDPRESS && (
						<p>
							This website is built on <b>WordPress</b> and it's using the{' '}
							<b>{details.themeName}</b> theme.
						</p>
					)}

					{details.platform === Platform.SHOPIFY && (
						<p>
							This website is built on <b>Shopify</b> and it's using the{' '}
							<a href={`${details.themeUrl}`} target='_blank' rel='noopener noreferrer'>
								<b>{details.themeName}</b>
							</a>{' '}
							theme.
						</p>
					)}

					{details.platform === Platform.SHOWIT && (
						<p>
							This is a{' '}
							<a href='https://showit.co/?ref=findr' target='_blank' rel='noopener noreferrer'>
								<b>Showit</b>
							</a>{' '}
							website.
						</p>
					)}

					{details.platform === Platform.WIX && (
						<p>
							This is a{' '}
							<a href='https://www.wix.com/?ref=findr' target='_blank' rel='noopener noreferrer'>
								<b>Wix</b>
							</a>{' '}
							website.
						</p>
					)}

					{details.platform === Platform.WEEBLY && (
						<p>
							This is a{' '}
							<a href='https://www.weebly.com/?ref=findr' target='_blank' rel='noopener noreferrer'>
								<b>Weebly</b>
							</a>{' '}
							website.
						</p>
					)}

					{details.platform === Platform.UNKNOWN && (
						<p>
							This website doesn't seem to be built on Squarespace or any of the other popular
							platforms. It could be custom-designed and self-hosted.
						</p>
					)}
				</div>
			)}
		</>
	);
}

import { useSearch } from 'hooks/search';
import { getRandomAdj } from '~/lib/utils';
import { LogInCard } from './auth/login';
import { Plans } from './signup';

export default function Home() {
	return (
		<main>
			<Splash />
			<Features />
			<Login />
			<Plans />
		</main>
	);
}

function Splash() {
	const { inputRef, handleSubmit } = useSearch();

	return (
		<div id='hero-09' style={{ background: '#E3F4FC' }}>
			<div className='container d-flex py-5' style={{ minHeight: '105vh' }}>
				<div className='row py-4 my-auto'>
					<div className='col-lg-8 col-md-6 col-sm-12 my-auto left-half'>
						<img className='w-100 mb-2' src='/images/device-01.png' />
					</div>

					<div className='col-lg-4 col-md-6 col-sm-12 mr-auto pb-3 my-auto right-half'>
						<h2 className='display-4 mb-3' style={{ fontFamily: `'Montserrat', sans-serif` }}>
							Findr
						</h2>
						<p className='lead pb-4 text-secondary'>
							The <span className='text-bold text-uppercase text-dark'>{getRandomAdj()}</span> way
							on the planet to find out which template any Squarespace website is using. Just copy,
							paste, and click! Not sure if it's on Squarespace? You'll find that out too.
						</p>

						{/*  embedded search form  */}
						<form className='needs-validation' noValidate onSubmit={handleSubmit}>
							<div className='form-row mb-4'>
								<div className='col-lg-8 col-md-8 col-sm-12 pb-2 mx-auto mx-lg-o'>
									<input
										className='form-control form-control-lg border-0'
										type='url'
										ref={inputRef}
										placeholder='Paste the URL here'
										aria-required='true'
										required
										autoFocus
									/>
									{/* <div className='invalid-feedback'>Please provide a valid URL.</div> */}
								</div>
								<div className='col-lg-4 col-md-8 col-sm-12 pb-2 mx-auto mx-lg-0'>
									<button className='btn btn-warning w-100 btn-lg border-0' type='submit'>
										SEARCH
										<i className='fa fa-angle-right ml-2'></i>
									</button>
								</div>
							</div>
						</form>

						<p className='mt-3 text-secondary'>
							<small>
								<i className='fa fa-info-circle mr-2'></i>
								<a className='btn-link text-secondary' href='#'>
									Learn more about <u>how and why</u>
								</a>
							</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

type Feature = {
	title: string;
	description: string;
	icon: string;
};
function Features() {
	const features: Feature[] = [
		{
			title: 'Effortless',
			description: `Copy, paste, and click: simple as that! No more fumbling around!`,
			icon: 'interface-53',
		},
		{
			title: 'Powerful',
			description:
				'Supports over 100 Squarespace templates and websites built on other popular platforms',
			icon: 'interface-54',
		},
		{
			title: 'Delightful',
			description:
				'Clean, modern, uncluttered design, making it a joy to use and easy addition to your workflow',
			icon: 'interface-65',
		},
		{
			title: 'Extensible',
			description: `Build your own personal library using favorites, categories, tags, and notes`,
			icon: 'interface-62',
		},
	];
	return (
		<div className='py-5 my-4' id='features-07'>
			<div className='container py-5'>
				<div className='row mb-5'>
					<div className='col text-center'>
						<h2 className='display-4 mb-3'>Key features</h2>
						<p className='lead text-secondary mb-3'>For the fans of Squarespace</p>
					</div>
				</div>
				<div className='row'>
					{features.map((f) => (
						<FeatureCard feature={f} key={f.title} />
					))}
				</div>
				<div className='row pt-5 pb-3'>
					<div className='col text-center'>
						<a className='btn btn-lg btn-dark mr-2' href='/register'>
							GET STARTED
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
function FeatureCard({ feature }: { feature: Feature }) {
	return (
		<div className='col-md-6 col-sm-12 mb-4 text-center' key={feature.title}>
			<div className='card bg-transparent pt-4 border-0'>
				<div className='card-body'>
					<img className='mb-4' src={`/icons/secondary/${feature.icon}.svg`} height='56px' />
					<h3 className='h5 text-dark'>{feature.title}</h3>
					<p className='lead mx-4 text-secondary mb-3'>{feature.description}</p>
				</div>
			</div>
		</div>
	);
}

function Login() {
	return (
		<div
			className='py-5'
			id='forms-02'
			style={{
				background: `linear-gradient(90deg, rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.3)), url('/images/device-02.jpg') center center`,
				backgroundSize: 'cover',
			}}
		>
			<div className='container d-flex flex-column py-5' style={{ minHeight: '105vh' }}>
				<div className='row my-auto'>
					<div className='col-lg-5 col-md-12 col-sm-12 my-auto'>
						<LogInCard />
					</div>
					<div className='col-lg-5 col-md-10 col-sm-12 m-auto py-5 my-auto'>
						<h2 className='display-4 mb-3 text-white'>Be a design ninja</h2>
						<p className='lead mb-4 mr-5 text-white'>
							Supercharge your Squarespace design workflow with Findr's cool features.
						</p>
						<hr className='my-4 border-light' style={{ opacity: '.2' }} />
						<a className='btn my-2 p-0 text-white' href='/login'>
							Get Started
							<i className='fa fa-angle-right ml-2' />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

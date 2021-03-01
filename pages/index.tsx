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
							The <b>FASTEST</b> way on the planet to find out which template any Squarespace
							website is using. Simple as the click of a button! Not sure if it's a Squarespace
							website? You'll find that out too.
						</p>

						{/*  embedded search form  */}
						<form method='post' className='needs-validation' noValidate>
							<div className='form-row mb-4'>
								<div className='col-lg-8 col-md-8 col-sm-12 pb-2 mx-auto mx-lg-o'>
									<input
										className='form-control form-control-lg border-0 rounded-0'
										type='url'
										placeholder='Enter a URL'
										aria-required='true'
										required
										autoFocus
									/>
									<div className='invalid-feedback'>Please provide a valid URL.</div>
								</div>
								<div className='col-lg-4 col-md-8 col-sm-12 pb-2 mx-auto mx-lg-0'>
									<button className='btn btn-warning w-100 btn-lg border-0 rounded-0' type='submit'>
										SEARCH
										<i className='fa fa-angle-right ml-2'></i>
									</button>
								</div>
							</div>
						</form>

						<p className='mt-3 text-secondary'>
							<small>
								<i className='fa fa-info-circle mr-2'></i>
								<a className='btn-link text-secondary' href='/'>
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
			title: 'Simple',
			description: `It's literally as easy as the click of a button. No more fumbling around!`,
			icon: 'interface-53',
		},
		{
			title: 'Powerful',
			description: 'With over 100 templates and insights about non-Squarespace websites',
			icon: 'interface-54',
		},
		{
			title: 'Delightful',
			description: 'Adopting the same clean, modern design language that Squarespace is known for',
			icon: 'interface-65',
		},
		{
			title: 'Extensible',
			description: `Build your own personal library by saving favorites, categorizing them, and adding
			tags/notes`,
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
						<div className='card border-0'>
							<div className='card-header bg-transparent px-5'>
								<h2 className='h4 pt-3 pb-2'>Login</h2>
							</div>
							<div className='card-block pt-4 px-5 pb-1'>
								{/*   embedded form   */}

								<form method='POST' className='pt-3 needs-validation' noValidate>
									<div className='form-group'>
										<input
											className='form-control form-control-lg rounded-0'
											type='email'
											id='email'
											name='email'
											placeholder='Email'
											aria-required='true'
											required
										/>
										<div className='invalid-feedback'>Please provide a valid email address.</div>
									</div>
									<div className='form-group mb-3'>
										<input
											className='form-control form-control-lg rounded-0'
											type='password'
											id='password'
											name='password'
											placeholder='Password'
											aria-required='true'
											required
										/>
										<div className='invalid-feedback'>Password is required.</div>
									</div>
									<div className='form-check mb-4'>
										<label className='form-check-label text-secondary' htmlFor='rememberMeCheck'>
											<input
												className='form-check-input mr-2'
												type='checkbox'
												value='1'
												id='rememberMeCheck'
												name='rememberMeCheck'
											/>
											Remember me
										</label>
									</div>
									<button className='btn btn-lg btn-warning mb-4 w-100 rounded-0' type='submit'>
										Sign In
									</button>
									<hr />
									<p className='text-center mb-5'>
										<small>
											<a className='text-secondary' href='@{/forgot-password}'>
												<u>I forgot my password</u>
											</a>
										</small>
									</p>
								</form>
							</div>
						</div>
					</div>
					<div className='col-lg-5 col-md-10 col-sm-12 m-auto py-5 my-auto'>
						<h2 className='display-4 mb-3 text-white'>Be a design ninja</h2>
						<p className='lead mb-4 mr-5 text-white'>
							Supercharge your Squarespace design workflow with Findr's cool features.
						</p>
						<hr className='my-4 border-light' style={{ opacity: '.2' }} />
						<a className='btn my-2 p-0 text-white' href='@{/register}'>
							Create account
							<i className='fa fa-angle-right ml-2' />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

type Plan = {
	level: number;
	name: string;
	features: string[];
	cost: number;
	highlighted?: boolean;
};
function Plans() {
	const plans: Plan[] = [
		{
			level: 1,
			name: 'Genin',
			features: ['10 searches a month'],
			cost: 0,
		},
		{
			level: 2,
			name: 'Chuunin',
			features: ['Unlimited searches'],
			cost: 2,
			highlighted: true,
		},
		{
			level: 3,
			name: 'Jounin',
			features: [
				'Unlimited searches',
				'Save all your favorites in one place',
				'Organize them using categories, tags, and personal notes',
			],
			cost: 5,
		},
	];
	return (
		<div className='py-5 bg-light' id='pricing-01'>
			<div className='container py-5 my-5'>
				<div className='row py-3'>
					<div className='col text-center'>
						<h2 className='display-4 mb-3'>Pick a plan that works for you</h2>
						<p className='lead text-secondary mb-5 pb-3 mx-5'>
							We've got something for every design ninja
						</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12 col-md-12 mx-lg-auto'>
						<div className='card-group'>
							{plans.map((p) => (
								<PlanCard p={p} key={p.level} />
							))}
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col text-center'>
						<a className='btn text-secondary p-4' href='/features'>
							<i className='fa fa-clone mr-2'></i>
							<u>Learn more</u>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

function PlanCard({ p }: { p: Plan }) {
	return (
		<div className='card mb-3 text-center' key={p.level}>
			<div className='card-body'>
				<h5 className='text-secondary mt-3 mb-4'>
					{p.name}
					{p.highlighted && <span className='badge badge-pill badge-secondary ml-2'>Popular</span>}
				</h5>
				{p.features.map((f, i) => (
					<p className='lead mb-3 text-secondary mx-4' key={i}>
						{f}
					</p>
				))}
			</div>
			<div className='card-footer bg-transparent border-0'>
				<div className='mb-5'>
					<span className='display-4'>{p.cost ? `$${p.cost}` : 'free'}</span>
					{p.cost ? <span className='text-secondary'>&nbsp;/ month</span> : null}
				</div>
				<a className='btn btn-warning w-100 btn-lg mb-3' href={`/register?level=${p.level}`}>
					Get started
				</a>
			</div>
		</div>
	);
}

import { getProviders, signIn, ClientSafeProvider, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const authErrors = {
	OAuthAccountNotLinked:
		"You've previously used the same email address to log in via a different auth provider.",
};

export function LogInCard() {
	const [providers, setProviders] = useState<Record<string, ClientSafeProvider>>({});
	useEffect(() => {
		getProviders().then(setProviders);
	}, []);

	const router = useRouter();
	const inputRef = useRef(null);
	const doEmailLogin = useCallback(
		(evt: React.FormEvent<HTMLFormElement>) => {
			const email = inputRef?.current.value;
			if (email) {
				signIn('email', { email, callbackUrl: router.query.callbackUrl as string });
			}
			evt.preventDefault();
		},
		[inputRef, router]
	);

	const [authError, setAuthError] = useState('');
	useEffect(() => {
		const { hash } = window?.location;
		const params = new URLSearchParams(hash);
		const key = params.get('error');
		if (key) {
			setAuthError(authErrors[key]);
		}
	});

	return (
		<div className='card border-0'>
			<div className='card-header bg-transparent px-5'>
				<h1 className='h4 pt-3 pb-2'>Passwordless Login </h1>
			</div>
			<div className='card-body pt-4 px-5 pb-1'>
				<div className='text-danger pb-1'>{authError}</div>

				{/* social login */}
				<ul className='list-inline pb-2 mx-3'>
					{Object.values(providers)
						.filter((provider) => provider.id !== 'email')
						.map((provider) => (
							<li className='list-item' key={provider.id}>
								<div className='input-group my-2'>
									<div className='input-group-prepend'>
										<div className='input-group-text'>
											<i
												className={`fab fa-${provider.id} fa-fw text-info h3`}
												title={`Login using ${provider.name}`}
											/>
										</div>
									</div>
									<input
										type='button'
										className='form-control social-login btn btn-outline-info'
										value={provider.name}
										onClick={() => signIn(provider.id)}
									/>
								</div>
							</li>
						))}
				</ul>

				<hr />

				{/* email login */}
				<form
					method='POST'
					className='pt-3 pb-2 mx-3 needs-validation'
					noValidate
					onSubmit={doEmailLogin}
				>
					<div className='form-group'>
						<input
							className='form-control form-control-lg'
							type='email'
							id='email'
							name='email'
							ref={inputRef}
							defaultValue={''}
							placeholder='My email address'
							required
						/>
						<div className='invalid-feedback'>Please provide a valid email address.</div>
					</div>
					<button className='btn btn-lg btn-warning mb-3 w-100' type='submit'>
						Send Me the Magic Link
					</button>
				</form>
			</div>

			<div className='card-footer '>
				<p className='text-center text-secondary px-5'>
					<small>No need to create an account or remember yet another password {` `}</small>
					<i className='far fa-smile' />
				</p>
			</div>
		</div>
	);
}

export default function Login() {
	const [session, loading] = useSession();
	const router = useRouter();
	useEffect(() => {
		if (!loading && session && router.query.callbackUrl) {
			router.replace(router.query.callbackUrl as string);
		}
	}, [loading, session, router]);
	return (
		<main
			id='login'
			style={{
				background: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url('/images/photo-41.jpg') center right`,
				backgroundSize: 'cover',
			}}
		>
			<div className='container d-flex flex-column' style={{ minHeight: '105vh' }}>
				<div className='row my-auto'>
					<div className='col-lg-5 col-md-10 col-sm-12 mx-auto my-5 py-5'>
						<LogInCard />
					</div>
				</div>
			</div>
		</main>
	);
}

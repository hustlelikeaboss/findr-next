import { providers, signIn, SessionProvider } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';

export default function SignIn({ providers }: { providers: { [id: string]: SessionProvider } }) {
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
						<div className='card border-0'>
							<div className='card-header bg-transparent px-5'>
								<h1 className='h4 pt-3 pb-2'>Passwordless Login </h1>
							</div>
							<div className='card-body pt-4 px-5 pb-1'>
								{/* email login */}
								<form
									method='POST'
									className='pt-2 needs-validation'
									noValidate
									onSubmit={doEmailLogin}
								>
									<div className='form-group'>
										<input
											className='form-control form-control-lg rounded-0'
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
									<button className='btn btn-lg btn-warning mb-3 w-100 rounded-0' type='submit'>
										Send Me the Magic Link
									</button>
								</form>

								<hr />

								{/* social login */}
								<h2 className='h6 text-center text-dark mt-3 p-1'>Social Logins</h2>
								<ul className='list-inline text-center mb-3'>
									{Object.values(providers)
										.filter((provider) => provider.id !== 'email')
										.map((provider) => (
											<li className='list-inline-item' key={provider.id}>
												<a className='btn-link h3 p-1' href='#' onClick={() => signIn(provider.id)}>
													<i
														className={`text-info fab fa-${provider.id}`}
														title={`Login using ${provider.name}`}
													/>
												</a>
											</li>
										))}
								</ul>
							</div>

							<div className='card-footer '>
								<p className='text-center text-secondary px-5'>
									<small>No need to create an account or remember yet another password {` `}</small>
									<i className='far fa-smile' />
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

SignIn.getInitialProps = async () => {
	return {
		providers: await providers(),
	};
};

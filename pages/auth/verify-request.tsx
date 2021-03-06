// TODO: baseUrl is undefined
// https://github.com/nextauthjs/next-auth/blob/76df2b5e702be2084674c81e098d989c2ec39ed9/src/server/pages/verify-request.js
export default function VerifyRequest({ baseUrl }: { baseUrl: string }) {
	return (
		<main
			id='login'
			style={{
				background: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .1)), url('/images/photo-41.jpg') center right`,
				backgroundSize: 'cover',
			}}
		>
			<div className='container d-flex flex-column' style={{ minHeight: '105vh' }}>
				<div className='row my-auto'>
					<div className='col-lg-5 col-md-10 col-sm-12 mx-auto my-5 py-5 text-white'>
						<h2 className='h1 pt-3 pb-2'>Check your email</h2>
						<p>
							A one-time <i className='fas fa-magic fa-fw text-warning' />
							{` `} magic link has been sent to your email address for you to sign in without having
							to enter a password.
						</p>
						<p className='text-secondary'>
							<a className='btn-link p-1' href={baseUrl}>
								<small>{baseUrl}</small>
							</a>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

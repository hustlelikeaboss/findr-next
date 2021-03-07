import { signIn, signOut, useSession } from 'next-auth/client';
import { useEffect } from 'react';
import { useSearch } from '../hooks';

const PUBLIC_ROUTES = ['/', '/faq', '/auth/login', '/auth/logout', '/auth/verify-request'];

export default function Navbar() {
	const [session, loading] = useSession();
	const { inputRef, handleSubmit } = useSearch();

	useEffect(() => {
		if (!PUBLIC_ROUTES.includes(window?.location?.pathname) && !loading && !session) {
			signIn();
		}
	}, [loading, session]);

	return (
		<nav className='navbar navbar-expand-lg fixed-top navbar-light'>
			<a className='navbar-brand p-0' href='/'>
				<span></span>
			</a>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarSupportedContent'
				aria-controls='navbarSupportedContent'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div className='collapse navbar-collapse' id='navbarSupportedContent'>
				{!session ? (
					<ul className='navbar-nav ml-auto'>
						<li className='nav-item'>
							<a className='btn mr-2 btn-dark' href='#' onClick={() => signIn()}>
								Login
							</a>
						</li>
					</ul>
				) : (
					<ul className='navbar-nav ml-auto pt-3'>
						<li className='nav-item mx-1'>
							<form
								className='needs-validation d-none d-md-block'
								onSubmit={handleSubmit}
								noValidate
							>
								<div className='form-row mb-4'>
									<div className='col-lg-12 col-md-8 col-sm-12 pr-2'>
										<input
											className='form-control pl-3'
											style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
											type='url'
											id='search-box'
											ref={inputRef}
											name='url'
											placeholder='Search'
											aria-required='true'
											required
										/>
										<div className='invalid-feedback'>Please provide a valid URL.</div>
									</div>
								</div>
								<input type='submit' style={{ display: 'none' }} />
							</form>
						</li>
						<li className='nav-item mx-1 dropdown active'>
							<a
								className='nav-link btn btn-warning dropdown-toggle'
								id='account-dropdown'
								href='#'
								role='button'
								data-toggle='dropdown'
								aria-haspopup='true'
								aria-expanded='false'
							>
								<img
									alt={'user profile image'}
									className='rounded-circle my-auto mr-3'
									src={session?.user?.image || '/images/avatar.png'}
									height='32'
								/>
								{session?.user?.name || session?.user?.email}
							</a>
							<div className='dropdown-menu' aria-labelledby='account-dropdown'>
								<a className='dropdown-item' href='/profile'>
									<i className='far fa-user pr-2'></i>Profile
								</a>
								<a className='dropdown-item' href='#'>
									<i className='far fa-bookmark pr-2'></i>Library
								</a>
								<a className='dropdown-item' href='/subscription'>
									<i className='far fa-chart-bar pr-2'></i>Subscription
								</a>
								<div className='dropdown-divider'></div>
								<a className='dropdown-item' href='#' onClick={() => signOut()}>
									<i className='fas fa-lock pr-2'></i>Logout
								</a>
							</div>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
}

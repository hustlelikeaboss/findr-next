export default function Navbar() {
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
				{/* <!-- Menu: not authenticated --> */}
				<ul className='navbar-nav ml-auto'>
					<li className='nav-item'>
						<a className='btn mr-2 btn-dark' href='/login'>
							Login
						</a>
					</li>
				</ul>

				{/* <!-- Menu: authenticated --> */}
				{/* <ul className='navbar-nav ml-auto'>
					<li className='nav-item mx-1'>
						<form method='POST' className='needs-validation d-none d-md-block' noValidate>
							<div className='form-row mb-4'>
								<div className='col-lg-12 col-md-8 col-sm-12 pr-2'>
									<input
										className='form-control pl-3 py-2'
										type='url'
										id='search-box'
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
						<a className='nav-link d-md-none' href='/search'>
							Search
						</a>
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
							<i className='fas fa-th pr-2'></i>Account
						</a>
						<div className='dropdown-menu' aria-labelledby='account-dropdown'>
							<a className='dropdown-item' href='#'>
								<i className='far fa-user pr-2'></i>Profile
							</a>
							<a className='dropdown-item' href='#'>
								<i className='far fa-bookmark pr-2'></i>Library
							</a>
							<a className='dropdown-item' href='/subscription'>
								<i className='far fa-chart-bar pr-2'></i>Subscription
							</a>
							<div className='dropdown-divider'></div>
							<a className='dropdown-item' href='/logout'>
								<i className='fas fa-lock pr-2'></i>Logout
							</a>
						</div>
					</li>
				</ul> */}
			</div>
		</nav>
	);
}

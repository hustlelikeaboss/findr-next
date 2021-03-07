export default function Footer() {
	return (
		<footer className='pt-2 pb-1'>
			<div className='container'>
				<div className='row mt-4'>
					<div className='col-lg-4 col-md-12 text-secondary text-center text-lg-left'>
						<p className='pb-2'>&copy; 2017 &ndash; {new Date().getFullYear()}, Findr</p>
					</div>
					<div className='col-lg-4 col-md-12 text-secondary text-center'>
						<ul className='list-inline'>
							<li className='list-inline-item'>
								<a
									className='btn-link h3 text-secondary p-1'
									href='https://github.com/hustlelikeaboss/findr-next'
									target='_blank'
									rel='noopener noreferrer'
								>
									<i className='fab fa-github'></i>
								</a>
							</li>
							<li className='list-inline-item'>
								<a
									className='btn-link h3 text-secondary p-1'
									href='https://www.hustlelikeaboss.design'
									target='_blank'
									rel='noopener noreferrer'
								>
									<i className='fa fa-globe'></i>
								</a>
							</li>
							<li className='list-inline-item'>
								<a
									className='btn-link h3 text-secondary p-1'
									href='mailto:david@hustlelikeaboss.design'
									target='_blank'
									rel='noopener noreferrer'
								>
									<i className='fas fa-envelope'></i>
								</a>
							</li>
						</ul>
					</div>
					<div className='col-lg-4 col-md-12 text-secondary text-center text-lg-right'>
						<ul className='list-inline pb-2'>
							<li className='list-inline-item'>
								<p className='py-2 text-secondary text-muted'>
									<small>
										<i>Not affiliated with Squarespace</i>
									</small>
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

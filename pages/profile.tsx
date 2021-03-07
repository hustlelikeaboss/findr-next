import { useSession } from 'next-auth/client';

export default function SignIn({}) {
	const [session] = useSession();

	return (
		<main className='container-fluid' id='hero-08' style={{ background: '#FFF4EE' }}>
			<div className='row' style={{ minHeight: '110vh' }}>
				<div
					className='col-lg-6 col-md-12'
					style={{
						background: `url('/images/photo-24.jpg') center center no-repeat`,
						backgroundSize: 'cover',
						minHeight: '100vh',
					}}
				></div>
				<div className='col-lg-4 col-md-8 col-sm-12 py-5 m-auto'>
					<h2
						className='text-center display-4 mb-5'
						style={{ fontFamily: `'Montserrat', sans-serif` }}
					>
						Profile
					</h2>

					<form className='needs-validation px-3' noValidate>
						<div className='form-row'>
							<div className='col-md-4 mb-3'>
								<label className='text-secondary' htmlFor='name'>
									<small>Name</small>
								</label>
								<div className='input-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text' id='inputGroupPrepend2'>
											<i className='far fa-user'></i>
										</span>
									</div>
									<input
										type='text'
										id='name'
										value={session?.user?.name}
										className='form-control'
										aria-describedby='inputGroupPrepend2'
									/>
								</div>
							</div>
							<div className='col-md-8 mb-3'>
								<label className='text-secondary' htmlFor='email'>
									<small>Email</small>
								</label>
								<div className='input-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text' id='inputGroupPrepend'>
											<i className='far fa-envelope'></i>
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										id='email'
										value={session?.user?.email}
										aria-describedby='inputGroupPrepend'
										required
									/>
								</div>
							</div>
						</div>

						<div className='form-row'>
							<div className='col-md-8 mb-3'>
								<label className='text-secondary' htmlFor='businessName'>
									<small>Business</small>
								</label>
								<div className='input-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text' id='inputGroupPrepend4'>
											<i className='far fa-building'></i>
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										id='businessName'
										aria-describedby='inputGroupPrepend4'
									/>
								</div>
							</div>
							<div className='col-md-4 mb-3'>
								<label className='text-secondary' htmlFor='country'>
									<small>Country</small>
								</label>
								<div className='input-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text' id='inputGroupPrepend5'>
											<i className='fas fa-map-marker-alt'></i>
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										id='country'
										aria-describedby='inputGroupPrepend5'
									/>
								</div>
							</div>
						</div>

						<div className='form-row'>
							<div className='col-md-10 mb-3'>
								<label className='text-secondary' htmlFor='website'>
									<small>Website</small>
								</label>
								<div className='input-group'>
									<div className='input-group-prepend'>
										<span className='input-group-text' id='inputGroupPrepend6'>
											<i className='fas fa-globe'></i>
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										id='website'
										aria-describedby='inputGroupPrepend6'
									/>
								</div>
							</div>
						</div>

						<div className='text-right'>
							<button className='btn btn-warning' type='submit'>
								Update
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}

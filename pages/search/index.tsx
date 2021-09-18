import React from 'react';
import { useSearch } from '~/hooks/search';

export default function Search() {
	const { inputRef, handleSubmit } = useSearch();

	return (
		<main
			id='search'
			className='bg-secondary text-white text-center'
			style={{
				background: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)),url('/images/photo-36.jpg') center 40%`,
				backgroundSize: 'cover',
			}}
		>
			<div className='container d-flex flex-column' style={{ minHeight: '105vh' }}>
				<div className='row mt-auto'>
					<div className='col-lg-8 col-md-8 col-sm-12 text-center mx-auto'>
						<h1
							className='display-3 mb-3 font-weight-normal'
							style={{ fontFamily: `'Montserrat', sans-serif` }}
						>
							Findr
						</h1>
						<p className='lead mb-5'>
							The <b>FASTEST</b> way on the planet to find out which template any Squarespace
							website is using. Simple as the click of a button! Not sure if it's a Squarespace
							website? You'll know.
						</p>
					</div>
				</div>
				<div className='row mb-auto'>
					<div className='col-lg-6 col-md-8 col-sm-12 mx-auto text-center'>
						{/* <!--  search form --> */}
						<form
							className='mx-auto my-auto text-center needs-validation'
							noValidate
							onSubmit={handleSubmit}
						>
							<div className='form-row mb-5 mb-3'>
								<div className='col-lg-9 text-center mb-2'>
									<input
										className='form-control form-control-lg border-0 rounded-0'
										type='url'
										ref={inputRef}
										placeholder='Enter a URL'
										aria-required='true'
										required
										autoFocus
									/>
									<div className='invalid-feedback text-left'>Please provide a valid URL.</div>
								</div>
								<div className='col-lg-3 col-md-3 col-sm-12 pb-2 mx-auto mr-lg-auto ml-lg-0'>
									<button className='btn btn-warning btn-lg w-100 border-0 rounded-0' type='submit'>
										SEARCH<i className='fa fa-angle-right ml-2'></i>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</main>
	);
}

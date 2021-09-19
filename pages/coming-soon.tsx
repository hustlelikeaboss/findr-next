import React from 'react';
import { useSearch } from '~/hooks/search';

export default function Search() {
	const { inputRef, handleSubmit } = useSearch();

	return (
		<main
			id='coming-soon'
			className='bg-secondary text-white text-center'
			style={{
				background: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)),url('/images/aditya-saxena.jpeg') center 40%`,
				backgroundSize: 'cover',
			}}
		>
			<div className='container d-flex flex-column' style={{ minHeight: '105vh' }}>
				<div className='row my-auto'>
					<div className='col-lg-8 col-md-8 col-sm-12 text-center mx-auto'>
						<h1
							className='display-3 mb-3 font-weight-normal'
							style={{ fontFamily: `'Montserrat', sans-serif` }}
						>
							Coming soon
						</h1>
						<p className='lead mb-5'>
							We're working hard to make it happen!
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}

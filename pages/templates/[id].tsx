import React from 'react';
import useSwr from 'swr';
import { useRouter } from 'next/router';

import { Template } from '../../data/repositories/Template';
import TemplateFamilyLink from '../../components/TemplateFamilyLink';
import TemplateImageLink from '../../components/TemplateImageLink';

export default function TemplateDetails() {
	const router = useRouter();
	const { id } = router.query;

	const { data: template, error } = useSwr<Template>([id], fetchTemplateById);
	if (error) return <div>failed</div>;
	if (!template) return <div>Loading</div>;

	return (
		<main>
			{/* basic info  */}
			<div className='pt-3'>
				<div className='container d-flex flex-column pt-5'>
					<div className='row my-auto my-5 pt-5 pb-4'>
						<div className='col-lg-8 col-md-10 col-sm-12 mx-auto'>
							<div className='row justify-content-between mb-3'>
								<div className='col-6 col-sm-4'>
									<h6>
										<TemplateFamilyLink id={template.templateFamilyId} />
									</h6>
								</div>
								<div className='col-6 col-sm-4 text-right'>
									{template.templateGuide && (
										<a
											className='small text-secondary pr-4'
											href={`${template.templateGuide}`}
											target='_blank'
										>
											User Guide<i className='fa fa-angle-right ml-2'></i>
										</a>
									)}
								</div>
							</div>

							<h1 className='mb-4 display-4 font-weight-normal'>
								<span>{template.templateName}</span>
								<sup>
									<i className='fas fa-heart fa-sm text-danger btn'></i>
								</sup>
							</h1>
							<p className='lead text-secondary mb-4'>{template.description}</p>
							{template.templateUrl && (
								<div className='text-right mb-3'>
									<a
										className='btn btn-lg btn-light'
										href={`${template.templateUrl}`}
										target='_blank'
									>
										Live Demo<i className='fa fa-angle-right ml-2'></i>
									</a>
								</div>
							)}

							<div className='clearfix'>
								<p className='text-secondary small text-left'>Last updated: 19 February, 2018</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/*  screenshot   */}
			<TemplateImageLink
				name={template.templateName}
				url={template.templateUrl}
				src={template.imageUrl}
				className='w-100 my-4 pb-3 border'
			/>

			{/*  user defined template details   */}
			{/* <UserTemplateDetails /> */}

			{/* recommended similar templates or websites build using template in family */}
			{/* <Recommendations /> */}
		</main>
	);
}

async function fetchTemplateById(id: number): Promise<Template> {
	if (!id) {
		return;
	}

	const res = await fetch(`/api/templates/${id}`);
	return res.json();
}

function UserTemplateDetails() {
	return (
		<div className='container d-flex flex-column py-5'>
			{/*   notes     */}
			<div className='row my-auto my-5 pb-2'>
				<div className='col-lg-8 col-md-10 col-sm-12 mx-auto'>
					<h3 className='h4 mb-4'>
						<i className='fas fa-palette text-muted pr-2'></i>Personal Notes
					</h3>
					<p className='mb-4 text-secondary mr-5'>
						Notes are whatever you want to add the template for future reference.{' '}
					</p>
				</div>
			</div>

			{/*    categories     */}
			<div className='row my-auto my-5 pb-2'>
				<div className='col-lg-8 col-md-10 col-sm-12 mx-auto'>
					<h3 className='h4 mb-3'>
						<i className='fas fa-paint-brush text-muted pr-2'></i>Categories
					</h3>
					<p className='mb-4 text-secondary mr-5'>
						<small>
							<i>
								Categories are broad terms to organize templates with. For example, you might have a
								categorization system in terms of industry and think this template is an excellent
								choice for "Fashion &amp; Beauty". Use categories sparingly and try to limit to a
								max of 3.
							</i>
						</small>
					</p>

					<form className='text-secondary mb-4'>
						<div className='form-check form-check-inline'>
							<input
								className='form-check-input'
								type='checkbox'
								id='inlineCheckbox1'
								value='option1'
							/>
							<label className='form-check-label' htmlFor='inlineCheckbox1'>
								Fashion &amp; Beauty
							</label>
						</div>
						<div className='form-check form-check-inline'>
							<input
								className='form-check-input'
								type='checkbox'
								id='inlineCheckbox2'
								value='option2'
								checked
							/>
							<label className='form-check-label' htmlFor='inlineCheckbox2'>
								Creative Services
							</label>
						</div>
						<div className='form-check form-check-inline'>
							<input
								className='form-check-input'
								type='checkbox'
								id='inlineCheckbox3'
								value='option3'
							/>
							<label className='form-check-label' htmlFor='inlineCheckbox3'>
								Food &amp; Drink
							</label>
						</div>
					</form>
				</div>
			</div>

			{/*    tags     */}
			<div className='row my-auto my-5 pb-2'>
				<div className='col-lg-8 col-md-10 col-sm-12 mx-auto'>
					<h3 className='h4 mb-3'>
						<i className='fas fa-tags text-muted pr-2'></i>Tags
					</h3>
					<p className='mb-4 text-secondary mr-5'>
						<small>
							<i>
								Tags are more fine-grained ways of sorting your templates. For example, if you want
								to be able to search for all the templates that have a certain feature or style, you
								could add tags like "stacked index page" or "minimalist". Be creative and use as
								many tags as you like!
							</i>
						</small>
					</p>

					<div className='form-group text-muted mr-5'>
						<select className='form-control user-tags' multiple>
							<option selected>parallax scrolling</option>
							<option selected>edgy</option>
							<option>stacked index page</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
}

function Recommendations() {
	return (
		<div className='container d-flex flex-column py-5'>
			<div className='row'>
				<div className='col'>
					<hr className='mt-5' />
				</div>
			</div>
			<div className='row text-center'>
				<div className='col my-5 pt-5'>
					<h2 className='display-4 mb-0'>You might also like</h2>
				</div>
			</div>
			<div className='row mb-5 py-5'>
				<div className='col-lg-12 m-auto'>
					<div className='card-group'>
						{/* card  */}
						<div className='card border rounded'>
							<a href='#'>
								<img className='card-img-top' src='/images/photo-40.jpg' alt='Card image cap' />
							</a>
							<div className='card-body pt-4'>
								<ul className='list-inline mt-1 clearfix'>
									<li className='list-inline-item float-left'>
										<a href='#' className='text-dark'>
											Bedford
										</a>
									</li>
									<li className='list-inline-item float-right'>
										<small>
											<i className='far fa-heart btn'></i>
										</small>
									</li>
								</ul>
							</div>
						</div>

						{/* card  */}
						<div className='card middle border rounded'>
							<a href='#'>
								<img className='card-img-top' src='/images/photo-47.jpg' alt='Card image cap' />
							</a>
							<div className='card-body pt-4 text-left'>
								<ul className='list-inline mt-1 clearfix'>
									<li className='list-inline-item float-left'>
										<a href='#' className='text-dark'>
											Avenue
										</a>
									</li>
									<li className='list-inline-item float-right'>
										<small>
											<i className='fas fa-heart btn text-danger'></i>
										</small>
									</li>
								</ul>
							</div>
						</div>

						{/* card  */}
						<div className='card border rounded'>
							<a href='#'>
								<img className='card-img-top' src='/images/photo-42.jpg' alt='Card image cap' />
							</a>
							<div className='card-body pt-4'>
								<ul className='list-inline mt-1 clearfix'>
									<li className='list-inline-item float-left'>
										<a href='#' className='text-dark'>
											Wexley
										</a>
									</li>
									<li className='list-inline-item float-right'>
										<small>
											<i className='far fa-heart btn'></i>
										</small>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

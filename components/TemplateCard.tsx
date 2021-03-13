import React from 'react';
import { Template } from '../data/repositories/Template';
import TemplateImageLink from './TemplateImageLink';

export default function TemplateCard({ template }: { template: Template }) {
	return (
		<div className='card border rounded h-100'>
			<TemplateImageLink
				name={template.templateName}
				url={template.templateUrl}
				src={template.imageUrl}
				className='card-img-top'
			/>

			<div className='card-body pt-4'>
				{/* categories */}
				<ul className='list-inline mt-1 clearfix'>
					<li className='list-inline-item float-left'>
						<small>
							<a href='#' className='text-muted'>
								Travel &amp; Lifestyle
							</a>
						</small>
					</li>
					<li className='list-inline-item float-right'>
						<small>
							<i className='far fa-heart btn'></i>
						</small>
					</li>
				</ul>
				<a className='card-link' href={`/templates/${template.id}`}>
					<h3 className='card-title font-weight-normal text-dark'>{template.templateName}</h3>
				</a>
				<p className='card-text text-secondary lead mb-4'>{template.description}</p>
			</div>

			{/* user tags */}
			{/* <div className='card-footer bg-white py-3 border-0 text-center'>
				<hr />
				<ul className='list-inline mt-1'>
					<li className='list-inline-item'>
						<small>
							<a className='card-link my-0 mx-0 px-0 text-secondary' href='#'>
								corporate
							</a>
						</small>
					</li>
					<li className='list-inline-item'>
						<small>
							<a className='card-link my-0 mx-0 px-0 text-secondary' href='#'>
								clean
							</a>
						</small>
					</li>
				</ul>
			</div> */}
		</div>
	);
}

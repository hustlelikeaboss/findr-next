import React from 'react';
import { Template } from '../data/repositories/Template';
import { splitArrByLength } from '../lib/utils';
import TemplateCard from './TemplateCard';

export default function TemplateGrid({ templates }: { templates?: Template[] }) {
	if (!templates?.length) {
		return null;
	}

	const templateDecks = splitArrByLength(templates, 3);

	return (
		<div className='py-5 bg-white' id='cards'>
			<div className='container py-3'>
				<div className='col-lg-12 m-auto'>
					{templateDecks.map((deck, i) => (
						<div className='card-deck' key={i}>
							{deck.map((t) => (
								<div className='col mb-4' key={t.id}>
									<TemplateCard template={t} />
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

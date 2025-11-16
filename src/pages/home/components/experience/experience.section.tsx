import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@/components/container';
import { Experience } from './type';
import Icon from '@icon-park/react/es/all';
import './experience.style.scss';
import { ClassNames } from '@/modules/classNames';


function ExperienceSection() {
	const CN = new ClassNames('experience');
	const { t} = useTranslation(['experience']);
	const hpeObjectives: Array<string> = new Array(5).fill(0).map((item, index) => t(`hpe.${index}`));
	const samItObjectives: Array<string> = new Array(2).fill(0).map((item, index) => t(`samit.${index}`));

	const experiencesList: Array<Experience> = [
		{
			title: 'Hewlett Packard Enterprise',
			type: 'On-Site',
			position: 'Cloud Developer 1',
			location: 'Bangalore, India',
			date: 'Jan. 2023 - Aug. 2025',
			translation_key: 'hpe',
			objectives: hpeObjectives,
		},
		{
			title: 'Sam IT Consultancy Services',
			type: 'Remote',
			position: 'Software Engineering Intern',
			location: 'London, UK',
			date: 'Aug. 2020 - Oct. 2020',
			translation_key: 'samit',
			objectives: samItObjectives,
		}
	];

	return (
		<section className={CN.generate()}>
			<Container>
				<h2 className={CN.generate('section-title')}>Experience</h2>
				{experiencesList.map((item: Experience) => (
					<div className={CN.generate('item')} key={item.translation_key}>
						<span className={CN.generate('bullet')}></span>
						<span>{item.title} <em>({item.type})</em></span>
						<h2>{ item.position }</h2>
						<div className={CN.generate('details')}>
							<span>{ item.location }</span>
							<p>{ item.date }</p>
						</div>
						<ul>
							{item.objectives.map((objective: string, index: number) => (
								<li className={CN.generate('objective')} key={`${item.translation_key}_${index}`}>
									<Icon type={'Dot'} theme={'outline'} size={24} />
									<p>{objective}</p>
								</li>
							))}
						</ul>
					</div>
				))}
			</Container>
		</section>
	);
}

export default ExperienceSection;
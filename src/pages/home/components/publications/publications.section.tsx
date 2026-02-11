import React from 'react';
import Container from '@/components/container';
import Hyperlink from '@/components/hyperlink';
import Icon from '@icon-park/react/es/all';
import './publications.style.scss';
import { ClassNames } from '@/modules/classNames';

interface Publication {
	title: string;
	venue: string;
	date: string;
	location: string;
	doi?: string;
	link?: string;
}

function PublicationsSection() {
	const CN = new ClassNames('publications');

	const publicationsList: Publication[] = [
		{
			title: 'Non-destructive Approach to Detect Pesticides in Fruits and Vegetables using IoT Technology',
			venue: '2020 ICCCI IEEE',
			date: 'January 22, 2020',
			location: 'Coimbatore, India',
			doi: '10.1109/ICCCI48352.2020.9104166',
			link: 'https://doi.org/10.1109/ICCCI48352.2020.9104166'
		},
		{
			title: 'Smart Sentimental Analysis of the Impact of Social Media on COVID-19',
			venue: 'Springer LNNS, Vol. 179',
			date: 'May 29, 2021',
			location: 'Singapore',
			doi: '10.1007/978-981-33-4687-1_42',
			link: 'https://doi.org/10.1007/978-981-33-4687-1_42'
		},
		{
			title: 'Comparative Analysis of Ant Colony Optimization and Particle Swarm Optimization for Test Case Prioritization',
			venue: '2022 3ICT',
			date: 'November 20, 2022',
			location: 'Sakheer, Bahrain',
			doi: '10.1109/3ICT56508.2022.9990713',
			link: 'https://doi.org/10.1109/3ICT56508.2022.9990713'
		},
		{
			title: 'Design thinking for deep learning-based metadata video analysis of YouTube video',
			venue: 'AIP Conf. Proc. 3161, 020369 (2024)',
			date: 'August 16, 2023',
			location: 'Kuala Lumpur, Malaysia',
			doi: '10.1063/5.0229427',
			link: 'https://doi.org/10.1063/5.0229427'
		},
		{
			title: 'Enhancing Dog Breed Identification Accuracy Using Hybrid Inception V3 and Xception Model',
			venue: '2025 3rd ICACEA',
			date: 'April 05, 2025',
			location: 'Coimbatore, India',
			doi: '10.1109/ICAECA63854.2025.11012309',
			link: 'https://doi.org/10.1109/ICAECA63854.2025.11012309'
		},
		{
			title: 'Assessing Domain-Level Susceptibility to Emergent Misalignment from Narrow Finetuning',
			venue: 'arXiv:2602.00298',
			date: 'Jan 30, 2026',
			location: '',
			doi: '10.48550/arXiv.2602.00298',
			link: 'https://doi.org/10.48550/arXiv.2602.00298'
		}
	];

	return (
		<section className={CN.generate()}>
			<Container>
				<h2 className={CN.generate('section-title')}>Publications</h2>
				<div className={CN.generate('list')}>
					{publicationsList.map((pub, index) => (
						<div key={index} className={CN.generate('item')}>
							<div className={CN.generate('number')}>{index + 1}</div>
							<div className={CN.generate('content')}>
								<h3 className={CN.generate('title')}>{pub.title}</h3>
								<div className={CN.generate('details')}>
									<p className={CN.generate('venue')}>
										<Icon type={'Book'} size={16} /> {pub.venue}
									</p>
									<p className={CN.generate('date')}>
										<Icon type={'Calendar'} size={16} /> {pub.date}
									</p>
									<p className={CN.generate('location')}>
										<Icon type={'Local'} size={16} /> {pub.location}
									</p>
									{pub.doi && (
										<p className={CN.generate('doi')}>
											<strong>DOI:</strong> {pub.doi}
										</p>
									)}
								</div>
								{pub.link && (
									<div className={CN.generate('link')}>
										<Hyperlink 
											variant={'primary-light'} 
											to={pub.link}
											target="_blank"
										>
											<Icon type="LinkOne" size={18} /> View Publication
										</Hyperlink>
									</div>
								)}
							</div>
						</div>
					))}
				</div>

				{/* <div className={CN.generate('achievements')}>
					<h2>Additional Achievements</h2>
					<ul>
						<li>
							<Icon type={'Trophy'} size={24} />
							<div>
								<strong>5-Star Java Developer</strong>
								<p>HackerRank - Demonstrated advanced proficiency in Java programming</p>
							</div>
						</li>
						<li>
							<Icon type={'PreviewOpen'} size={24} />
							<div>
								<strong>Cloud Technologies Workshop Conductor</strong>
								<p>Conducted workshop and taught 100+ students at SNS Institutions, Coimbatore, India</p>
							</div>
						</li>
					</ul>
				</div> */}
			</Container>
		</section>
	);
}

export default PublicationsSection;
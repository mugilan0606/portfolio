import React from 'react';
import Container from '@/components/container';
import { Experience } from './type';
import Icon from '@icon-park/react/es/all';
import './experience.style.scss';
import { ClassNames } from '@/modules/classNames';

// Embedded experience data
const experienceData = {
	hpe: {
		"0": "Developed an automation framework with Ansible and Python, single-handedly automated server configuration tasks for ESXi, vCenter, DNS, vDS, multiple VMs - reducing deployment time from 6 days to 5 hours (97% decrease in deployment time) and contributed to over $40m in revenue",
		"1": "Executed end-to-end infrastructure deployments on Baremetal servers and ESXi Hypervisors, including DNS setup, virtual switch and cluster creation, VM migration (vSS → vDS) without downtime, and provisioning of management VMs",
		"2": "Spearheaded security of the CDC solution by including encryption mechanisms with AES-256 using HashiCorp for passwords",
		"3": "Enhanced provisioning workflows by customizing Kickstart and enabling support for RHEL 8.8/9.2 and SUSE 15 SP5 in SAP HANA-based PDC solutions",
		"4": "Implemented multilingual support in the automation application, enabling global accessibility and improving adoption across international teams"
	},
	samit: {
		"0": "Designed and deployed a sentiment analysis framework on 100k+ client emails using LSTM models with fine-grained sentiment categories, achieving 95% accuracy through optimized preprocessing and tuning",
		"1": "Built a prototype application that enabled ticket prioritization and faster client response, reducing manual effort and improving customer satisfaction"
	}
};

function ExperienceSection() {
	const CN = new ClassNames('experience');
	
	// Extract objectives from embedded data
	const hpeObjectives: Array<string> = Object.values(experienceData.hpe);
	const samItObjectives: Array<string> = Object.values(experienceData.samit);

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
						<h2>{item.position}</h2>
						<div className={CN.generate('details')}>
							<span>{item.location}</span>
							<p>{item.date}</p>
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
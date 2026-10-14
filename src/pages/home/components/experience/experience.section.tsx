import React from 'react';
import Container from '@/components/container';
import { Experience } from './type';
import Icon from '@icon-park/react/es/all';
import './experience.style.scss';
import { ClassNames } from '@/modules/classNames';

// Embedded experience data
const experienceData = {
	rivianvw: {
		"0": "Build automation workflows in Python using AI agents (Devin) that integrate across internal platforms including Slack and Databricks, validating AI-generated output with a human in the loop before it reaches production",
		"1": "Manage GitLab CI/CD pipelines and DevOps practices to safely deploy changes to production across cross-platform systems integration projects",
		"2": "Automate testing with pytest to catch regressions early, improving the quality and reliability of integration code",
		"3": "Build data visualization dashboards that filter operational metrics into actionable signals for the team"
	},
	hpe: {
		"0": "Designed and built a distributed provisioning system in Python and Ansible to orchestrate ESXi/vCenter cloud environments across multi-node enterprise clusters - reducing deployment time from 6 days to 5 hours (97% reduction) and contributing to $40M+ in revenue",
		"1": "Engineered orchestration workflows for infrastructure lifecycle management on Baremetal servers and ESXi Hypervisors, automating DNS setup, virtual switch creation and zero-downtime VM migration (vSS → vDS)",
		"2": "Built internal REST APIs and CLI tooling in Python to expose provisioning status and trigger deployments, integrated with enterprise monitoring and ticketing systems",
		"3": "Architected modular, reusable Python components for provisioning Linux systems (RHEL 8.8/9.2, SUSE 15 SP5) in SAP HANA-based solutions, reducing configuration errors across large-scale deployments",
		"4": "Implemented secure credential management using AES-256 encryption integrated with HashiCorp Vault for production systems handling sensitive configuration data"
	},
	samit: {
		"0": "Built an end-to-end machine learning pipeline in Python using PyTorch LSTM models to classify 100K+ unstructured client emails into fine-grained sentiment categories, reaching 95% accuracy through preprocessing, sequence modeling and hyperparameter tuning",
		"1": "Developed a backend ticket prioritization system with a REST API, reducing manual triage effort and improving client response efficiency",
		"2": "Wrote unit and integration tests and documented technical designs alongside senior engineers"
	}
};

function ExperienceSection() {
	const CN = new ClassNames('experience');
	
	// Extract objectives from embedded data
	const rivianVwObjectives: Array<string> = Object.values(experienceData.rivianvw);
	const hpeObjectives: Array<string> = Object.values(experienceData.hpe);
	const samItObjectives: Array<string> = Object.values(experienceData.samit);

	const experiencesList: Array<Experience> = [
		{
			title: 'Rivian and Volkswagen Technologies',
			type: 'On-Site',
			position: 'Software Engineering Intern, Systems Integrations',
			location: 'Irvine, CA',
			date: 'Sep. 2026 - Present',
			translation_key: 'rivianvw',
			objectives: rivianVwObjectives,
		},
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
		<div className={CN.generate()}>
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
		</div>
	);
}

export default ExperienceSection;
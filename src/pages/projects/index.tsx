import React from 'react';
import Container from '@/components/container';
import FlexRow from '@/components/flex-row';
import FlexCol from '@/components/flex-col';
import Header from '@/components/header';
import Hyperlink from '@/components/hyperlink';
import Icon from '@icon-park/react/es/all';
import './style.scss';
import { ClassNames } from '@/modules/classNames';

interface Project {
	title: string;
	description: string;
	technologies: string[];
	features: string[];
	github?: string;
	demo?: string;
}

function Projects() {
	const CN = new ClassNames('projects');

	const projectsList: Project[] = [
		{
			title: 'Infrastructure Automation Framework',
			description: 'Enterprise-grade automation framework developed at HPE using Ansible and Python. Automated server configuration for ESXi, vCenter, and multiple VMs, reducing deployment time from 6 days to 5 hours (97% decrease), contributing to over $40M in revenue.',
			technologies: ['Python', 'Ansible', 'ESXi', 'vCenter', 'RHEL', 'SUSE', 'HashiCorp'],
			features: [
				'97% reduction in deployment time',
				'End-to-end infrastructure automation',
				'AES-256 encryption for security',
				'Multilingual support for global teams',
				'Support for RHEL 8.8/9.2 and SUSE 15 SP5'
			]
		},
		{
			title: 'Website Designing Platform for Small Scale Industries',
			description: 'Scalable web portal enabling deployment of customizable website templates for product showcasing. Provides small-scale business owners with a cost-effective solution to establish professional online presence.',
			technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'AngularJS', 'MongoDB'],
			features: [
				'Customizable website templates',
				'Responsive design',
				'Template management system',
				'Quick deployment capabilities',
				'User-friendly interface'
			],
			github: 'YOUR_GITHUB_REPO_LINK'
		},
		{
			title: 'Hybrid Model for Dog Breed Classification',
			description: 'Developed a Hybrid ML model combining Inception and Xception architectures, achieving 94% accuracy in dog breed classification. Performed comparative analysis with baseline CNNs and applied hyperparameter optimization.',
			technologies: ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'OpenCV', 'PyTorch'],
			features: [
				'94% classification accuracy',
				'Hybrid CNN architecture (Inception + Xception)',
				'Transfer learning implementation',
				'Comprehensive model visualization with TensorBoard',
				'Feature extraction optimization'
			],
			github: 'YOUR_GITHUB_REPO_LINK'
		},
		{
			title: 'Encryption Tool for Chatbots',
			description: 'Developed and published a Dart package using Flutter that enables end-to-end encryption for chatbot conversations. Lightweight and modular design for seamless security integration.',
			technologies: ['Dart', 'Flutter', 'Firebase'],
			features: [
				'End-to-end encryption for chatbot messages',
				'Lightweight and modular architecture',
				'Published Dart package',
				'Firebase integration for secure storage',
				'Easy integration with existing chatbots'
			],
			github: 'YOUR_GITHUB_REPO_LINK',
			demo: 'https://pub.dev/packages/yourpackage'
		},
		{
			title: 'Sentiment Analysis Framework',
			description: 'Designed and deployed a sentiment analysis framework on 100k+ client emails using LSTM models with fine-grained sentiment categories, achieving 95% accuracy. Built during internship at Sam IT Consultancy Services.',
			technologies: ['Python', 'LSTM', 'NLP', 'TensorFlow', 'Keras'],
			features: [
				'95% accuracy in sentiment classification',
				'Fine-grained sentiment categories',
				'Processed 100k+ emails',
				'Optimized preprocessing pipeline',
				'Ticket prioritization system'
			]
		}
	];

	return (
		<>
			<Header />
			<section className={CN.generate()}>
				<Container>
					<h1 className={CN.generate('page-title')}>Page Name</h1>
					<FlexRow>
						{projectsList.map((project, index) => (
							<FlexCol xs={24} sm={24} md={12} lg={12} key={index}>
								<div className={CN.generate('card')}>
									<h3 className={CN.generate('title')}>{project.title}</h3>
									<p className={CN.generate('description')}>{project.description}</p>
									
									<div className={CN.generate('technologies')}>
										<h4>Technologies:</h4>
										<div className={CN.generate('tech-tags')}>
											{project.technologies.map((tech, techIndex) => (
												<span key={techIndex} className={CN.generate('tag')}>{tech}</span>
											))}
										</div>
									</div>

									<div className={CN.generate('features')}>
										<h4>Key Features:</h4>
										<ul>
											{project.features.map((feature, featureIndex) => (
												<li key={featureIndex}>
													<Icon type={'CheckOne'} theme={'outline'} size={16} />
													{feature}
												</li>
											))}
										</ul>
									</div>

									<div className={CN.generate('links')}>
										{project.github && (
											<Hyperlink 
												variant={'primary-light'} 
												to={project.github}
												target="_blank"
											>
												<Icon type="Github" size={20} /> GitHub
											</Hyperlink>
										)}
										{project.demo && (
											<Hyperlink 
												variant={'secondary'} 
												to={project.demo}
												target="_blank"
											>
												<Icon type="LinkOne" size={20} /> Live Demo
											</Hyperlink>
										)}
									</div>
								</div>
							</FlexCol>
						))}
					</FlexRow>
				</Container>
			</section>
		</>
	);
}

export default Projects;

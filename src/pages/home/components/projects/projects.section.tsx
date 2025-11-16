import React from 'react';
import Container from '@/components/container';
import FlexRow from '@/components/flex-row';
import FlexCol from '@/components/flex-col';
import Hyperlink from '@/components/hyperlink';
import Icon from '@icon-park/react/es/all';
import './projects.style.scss';
import { ClassNames } from '@/modules/classNames';

interface Project {
	title: string;
	description: string;
	technologies: string[];
	features: string[];
	github?: string;
	kaggle?: string;
	demo?: string;
}

function ProjectsSection() {
	const CN = new ClassNames('projects-section');

	const projectsList: Project[] = [
		
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
			github: 'https://github.com/mugilan0606/small_scale_business_web_template'
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
			kaggle: 'https://www.kaggle.com/code/mugilana/dog-breed-identification-hybrid'
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
			demo: 'https://pub.dev/packages/easy_encryption'
		},
		{
			title: 'Vehicle Monitoring & Accident Detection System',
			description: 'IoT-based real-time accident detection system using MPU6050, GPS, GSM, and NodeMCU. Automatically detects crashes, retrieves GPS coordinates, sends SMS alerts to emergency contacts, and uploads critical event data to the cloud.',
			technologies: [
				'Arduino Uno',
				'MPU6050',
				'801S Vibration Sensor',
				'SIM28ML GPS Module',
				'SIM900 GSM Module',
				'NodeMCU ESP8266',
				'Processing (Java)',
				'TinyGPS++',
				'SoftwareSerial'
			],
			features: [
				'Real-time accident detection using motion and vibration sensors',
				'GPS-based location tracking',
				'Automatic SMS alerts to emergency contacts',
				'Cloud data upload via NodeMCU',
				'User override button for false-alarm prevention',
				'Audible buzzer alert upon detected crash',
				'MPU6050 3D orientation visualizer using Processing',
				'Low-cost and scalable IoT architecture'
			],
			github: 'https://github.com/mugilan0606/Vehicle-Collision-monitoring-using-IOT.git'
		},
	];

	return (
		<section className={CN.generate()} data-theme="projects">
			<Container>
				<h2 className={CN.generate('section-title')}>Projects</h2>
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

								{(project.github || project.kaggle || project.demo) && (
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
										{project.kaggle && (
											<Hyperlink 
												variant={'primary-light'} 
												to={project.kaggle}
												target="_blank"
											>
												<Icon type="TrendTwo" size={20} /> Kaggle
											</Hyperlink>
										)}
										{project.demo && (
											<Hyperlink 
												variant={'primary-light'} 
												to={project.demo}
												target="_blank"
											>
												<Icon type="LinkOne" size={20} /> Link
											</Hyperlink>
										)}
									</div>
								)}
							</div>
						</FlexCol>
					))}
				</FlexRow>
			</Container>
		</section>
	);
}

export default ProjectsSection;
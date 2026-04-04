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
			title: "Let's Debate",
			description: "Multi-agent AI company comparison platform where users add companies as agents, let them gather structured web intelligence, and run multi-round debates to answer comparative business questions in real time.",
			technologies: [
				"TypeScript",
				"Cloudflare Workers",
				"Cloudflare Agents SDK",
				"Durable Objects",
				"D1",
				"Vectorize",
				"Workers AI",
				"React",
				"Vite",
				"WebSockets"
			],
			features: [
				"Add and manage multiple company-specific agents",
				"Background web scraping and profile generation for each company",
				"Real-time split-screen UI for agent management and chat",
				"Multi-round debate flow with opening statements and 3 rebuttal cycles",
				"Confidence scoring, ranking, and tie-break based final verdicts",
				"Persistent company state using Durable Objects and D1"
			],
			demo: "https://cf-ai-competitor-research.mugilan0606.workers.dev/",
			github: "https://github.com/mugilan0606/cf_ai_letsdebate"
		},
		{
			title: 'DevDocs.ai',
			description: 'AI-powered documentation assistant for code repositories with a Flask backend and Vite frontend. Supports guided setup, Google OAuth, and split deployment across Render and Vercel for a production-ready developer workflow.',
			technologies: ['Python', 'Flask', 'Gunicorn', 'React', 'Vite', 'SQLite', 'AWS S3', 'Google OAuth', 'OpenAI API', 'Groq API'],
			features: [
				'RAG-powered chat for repository Q&A',
				'Multi-provider LLM support (OpenAI and Groq/Llama)',
				'Google Sign-in with account history persistence',
				'Auto-generated PDF docs and architecture summaries',
				'Mermaid sequence diagrams and API/setup/test outputs',
				'Deployed using Render backend and Vercel frontend'
			],
			demo: 'https://dev-docs-app.vercel.app/',
			github: 'https://github.com/mugilan0606/DevDocs'
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
			github: 'https://github.com/mugilan0606/Dog-Breed-Prediction'
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

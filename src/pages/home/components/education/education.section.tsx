import React from 'react';
import Container from '@/components/container';
import Icon from '@icon-park/react/es/all';
import './education.style.scss';
import { ClassNames } from '@/modules/classNames';

interface Education {
	degree: string;
	institution: string;
	location: string;
	duration: string;
	gpa?: string;
	coursework: string[];
}

function EducationSection() {
	const CN = new ClassNames('education-section');

	const educationList: Education[] = [
		{
			degree: 'Master of Science in Computer Science',
			institution: 'University of Massachusetts Amherst',
			location: 'Amherst, MA',
			duration: 'Sept 2025 – Present',
			coursework: [
				'Machine Learning',
				'Reinforcement Learning',
				'Trustworthy and Responsible AI'
			]
		},
		{
			degree: 'Bachelor of Technology in Information Technology',
			institution: 'Vellore Institute of Technology',
			location: 'Vellore, India',
			duration: 'Aug 2019 – May 2023',
			gpa: '3.87/4.0',
			coursework: [
				'Data Structures & Algorithm',
				'System Design',
				'DevOps',
				'Operating Systems',
				'Web Technologies',
				'Machine Learning',
				'Natural Language Processing',
				'Neural Networks',
				'Information Security',
				'Computer Networks'
			]
		}
	];

	return (
		<section className={CN.generate()}>
			<Container>
				<h2 className={CN.generate('section-title')}>Education</h2>
				<div className={CN.generate('timeline')}>
					{educationList.map((edu, index) => (
						<div key={index} className={CN.generate('item')}>
							<div className={CN.generate('marker')}>
								<Icon type="DegreeHat" theme="filled" size={32} />
							</div>
							<div className={CN.generate('content')}>
								<div className={CN.generate('header')}>
									<h3 className={CN.generate('degree')}>{edu.degree}</h3>
									<span className={CN.generate('duration')}>{edu.duration}</span>
								</div>
								<h4 className={CN.generate('institution')}>{edu.institution}</h4>
								<p className={CN.generate('location')}>
									<Icon type={'Local'} size={16} /> {edu.location}
								</p>
								{edu.gpa && (
									<p className={CN.generate('gpa')}>
										<strong>GPA:</strong> {edu.gpa}
									</p>
								)}
								<div className={CN.generate('coursework')}>
									<h5>Relevant Coursework:</h5>
									<ul>
										{edu.coursework.map((course, courseIndex) => (
											<li key={courseIndex}>
												<Icon type={'CheckOne'} theme={'outline'} size={16} />
												{course}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}

export default EducationSection;
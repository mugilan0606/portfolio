import ReactIcon from '@/icons/React';
import Container from '@/components/container';
import FlexRow from '@/components/flex-row';
import FlexCol from '@/components/flex-col';
import Header from '@/components/header';
// Import your skill icons
import Python from '@/icons/Python';
import JavaScript from '@/icons/JavaScript';
import React from '@/icons/React';
import TypeScript from '@/icons/TypeScript';
import Angular from '@/icons/Angular';
import Docker from '@/icons/Docker';
import MongoDB from '@/icons/MongoDB';
import ExpressJs from '@/icons/ExpressJs';
import './style.scss';
import { ClassNames } from '@/modules/classNames';

function Skills() {
	const CN = new ClassNames('skills');

	const skillCategories = [
		{
			category: "Programming Languages",
			skills: [
				{ name: "Python", icon: <Python size={48} /> },
				{ name: "JavaScript", icon: <JavaScript size={48} /> },
				{ name: "TypeScript", icon: <TypeScript size={48} /> },
				{ name: "Java", icon: null },
				{ name: "C", icon: null },
				{ name: "C++", icon: null },
				{ name: "Dart", icon: null }
			]
		},
		{
			category: "Frameworks & Libraries",
			skills: [
				{ name: "Node.js", icon: null },
				{ name: "React", icon: <ReactIcon size={48} /> },
				{ name: "Flutter", icon: null },
				{ name: "Ansible", icon: null },
				{ name: "TensorFlow", icon: null },
				{ name: "PyTorch", icon: null },
				{ name: "Angular", icon: <Angular size={48} /> },
				{ name: "Express.js", icon: <ExpressJs size={48} /> }
			]
		},
		{
			category: "Infrastructure & Virtualization",
			skills: [
				{ name: "ESXi Hypervisors", icon: null },
				{ name: "Baremetal Servers", icon: null },
				{ name: "HANA DB", icon: null },
				{ name: "RHEL", icon: null },
				{ name: "SUSE Linux", icon: null }
			]
		},
		{
			category: "Databases",
			skills: [
				{ name: "Redis", icon: null },
				{ name: "PostgreSQL", icon: null },
				{ name: "MongoDB", icon: <MongoDB size={48} /> },
				{ name: "Firebase", icon: null }
			]
		},
		{
			category: "Cloud & DevOps",
			skills: [
				{ name: "Docker", icon: <Docker size={48} /> },
				{ name: "Kubernetes", icon: null },
				{ name: "AWS", icon: null },
				{ name: "CI/CD", icon: null },
				{ name: "Git", icon: null }
			]
		},
		{
			category: "Tools & Technologies",
			skills: [
				{ name: "REST API", icon: null },
				{ name: "HashiCorp", icon: null },
				{ name: "Kickstart", icon: null },
				{ name: "vCenter", icon: null }
			]
		}
	];

	return (
		<>
			<Header/>
			<section className={CN.generate()}>
				<Container>
					<h1 className={CN.generate('page-title')}>Skills</h1>
					{skillCategories.map((category, index) => (
						<div key={index} className={CN.generate('category')}>
							<h2 className={CN.generate('category-title')}>{category.category}</h2>
							<FlexRow>
								{category.skills.map((skill, skillIndex) => (
									<FlexCol xs={12} sm={8} md={6} lg={4} key={skillIndex}>
										<div className={CN.generate('item')}>
											<div className={CN.generate('icon')}>
												{skill.icon || <span className={CN.generate('placeholder')}>{skill.name.charAt(0)}</span>}
											</div>
											<p className={CN.generate('name')}>{skill.name}</p>
										</div>
									</FlexCol>
								))}
							</FlexRow>
						</div>
					))}
				</Container>
			</section>
		</>
	);
}

export default Skills;

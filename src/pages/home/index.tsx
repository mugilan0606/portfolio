import React from 'react';
import HeroSection from './components/hero/hero.section';
import MediumSection from './components/medium/medium.section';
import ExperienceSection from './components/experience/experience.section';
import ProjectsSection from './components/projects/projects.section';
import EducationSection from './components/education/education.section';
import PublicationsSection from './components/publications/publications.section';
import Skills from './components/skills/skills.section';
import './style.scss';


function Home() {

	return (
		<>
			<section id="hero" >
				<HeroSection />
			</section>
			<section id="experience" data-theme="experience">
				<ExperienceSection />
			</section>
			
			<section id="education"  data-theme="education">
				<EducationSection />
			</section>
			<section id="projects"  data-theme="projects">
				<ProjectsSection />
			</section>
			<section id="skills" data-theme="skills" >
				<Skills />
			</section>
			<section id="publications" data-theme="publications" >
				<PublicationsSection />
			</section>
			
			{/* <section id="medium"  data-theme="experience">
				<MediumSection />
			</section> */}
		</>
	);
}

export default Home;
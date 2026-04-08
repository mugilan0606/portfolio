import React from 'react';
import HeroSection from './components/hero/hero.section';
import ExperienceSection from './components/experience/experience.section';
import ProjectsSection from './components/projects/projects.section';
import EducationSection from './components/education/education.section';
import PublicationsSection from './components/publications/publications.section';
import Skills from './components/skills/skills.section';
import ScrollFadeSection from '@/components/scroll-fade-section/scroll-fade-section';
import './style.scss';

function Home() {

	return (
		<div className="home-page">
			<div className="home-page__mobile-frame">
				<ScrollFadeSection id="hero" data-theme="hero">
					<HeroSection />
				</ScrollFadeSection>
				<ScrollFadeSection id="experience" data-theme="experience">
					<ExperienceSection />
				</ScrollFadeSection>
				<ScrollFadeSection id="education" data-theme="education">
					<EducationSection />
				</ScrollFadeSection>
				<ScrollFadeSection id="projects" data-theme="projects">
					<ProjectsSection />
				</ScrollFadeSection>
				<ScrollFadeSection id="skills" data-theme="skills">
					<Skills />
				</ScrollFadeSection>
				<ScrollFadeSection id="publications" data-theme="publications">
					<PublicationsSection />
				</ScrollFadeSection>
			</div>
		</div>
	);
}

export default Home;
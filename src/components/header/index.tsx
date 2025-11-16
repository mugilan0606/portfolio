import React from 'react';
import './style.scss';
import Icon from '@icon-park/react/es/all';

const Header = () => {

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ 
				behavior: 'smooth',
				block: 'start'
			});
		}
	};

	return (
		<header className={'header'}>
			<nav>
				<a
					onClick={() => scrollToSection('hero')}
					data-tooltip-id="tooltip-area"
					data-tooltip-content="Home"
					data-tooltip-place="right"
					style={{ cursor: 'pointer' }}
				>
					<Icon type={'Home'} theme={'outline'} size={24} />
				</a>
				<a
					onClick={() => scrollToSection('experience')}
					data-tooltip-id="tooltip-area"
					data-tooltip-content="Experience"
					data-tooltip-place="right"
					style={{ cursor: 'pointer' }}
				>
					<Icon type={'ApplicationTwo'} theme={'outline'} size={24} />
				</a>
				
				<a
					onClick={() => scrollToSection('education')}
					data-tooltip-id="tooltip-area"
					data-tooltip-content="Education"
					data-tooltip-place="right"
					style={{ cursor: 'pointer' }}
				>
					<Icon type="DegreeHat" theme="filled" size={32} />
				</a>
				<a
					onClick={() => scrollToSection('projects')}
					data-tooltip-id="tooltip-area"
					data-tooltip-content="Projects"
					data-tooltip-place="right"
					style={{ cursor: 'pointer' }}
				>
					<Icon type={'Code'} theme={'outline'} size={24} />
				</a>
				<a
					onClick={() => scrollToSection('skills')}
					data-tooltip-id="tooltip-area"
					data-tooltip-content="Skills"
					data-tooltip-place="right"
					style={{ cursor: 'pointer' }}
				>
					<Icon type={'Cpu'} theme={'outline'} size={24} />
				</a>
				<a
					onClick={() => scrollToSection('publications')}
					data-tooltip-id="tooltip-area"
					data-tooltip-content="Publications"
					data-tooltip-place="right"
					style={{ cursor: 'pointer' }}
				>
					<Icon type={'BookOpen'} theme={'outline'} size={24} />
				</a>
			</nav>
		</header>
	);
}

export default Header;
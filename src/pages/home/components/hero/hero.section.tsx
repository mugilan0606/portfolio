import React from 'react';
import Icon from '@icon-park/react/es/all';
import Container from '@/components/container';
import FlexRow from '@/components/flex-row';
import FlexCol from '@/components/flex-col';
import Hyperlink from '@/components/hyperlink';
import Linkedin from '@/icons/linkedin';
import links from '@/constants/links.json';
import './hero.style.scss';
import HeroCompactDiagram from './hero-compact-diagram';
import { ClassNames } from '@/modules/classNames';



function HeroSection() {
	const CN = new ClassNames('hero');

	return (
		<div className={CN.generate('')}>
			<span className={CN.generate('circle', ['one'])}/>
			<span className={CN.generate('circle', ['two'])}/>
			<Container>
				<FlexRow>
					<FlexCol xs={24} sm={24} md={18}>
						<div className={CN.generate('content')}>
							<h1>Hi, 👋🏻<br/> <i>I'm</i> Mugilan</h1>
							<p>
								Software Engineer with 2+ years of experience specializing in 
								infrastructure automation and full-stack development. Currently pursuing MS in Computer Science 
								at UMass Amherst. Passionate about building 
								scalable solutions and exploring cutting-edge technologies in AI and Systems.
							</p>
							<div className={CN.generate('actions')}>
								<Hyperlink
									variant={'primary-light'}
									to={links["social"]["resume"]}
									target="_blank"
									data-tooltip-id="tooltip-area"
									data-tooltip-content="Download Resume"
									data-tooltip-place="bottom"
								>
									<Icon type={'DownloadTwo'} size={24}/> Download CV
								</Hyperlink>
								<Hyperlink
									icon={true}
									variant={'linear-light'}
									to={links["social"]["linkedin"]}
									target="_blank"
									data-tooltip-id="tooltip-area"
									data-tooltip-content="LinkedIn"
									data-tooltip-place="bottom"
								>
									<Linkedin size={24}/>
								</Hyperlink>
								<Hyperlink
									icon={true}
									variant={'linear-light'}
									to={links["social"]["github"]}
									target="_blank"
									data-tooltip-id="tooltip-area"
									data-tooltip-content="Github"
									data-tooltip-place="bottom"
								>
									<Icon type="Github" theme="filled" size={24}/>
								</Hyperlink>
								<Hyperlink
									icon={true}
									variant={'linear-light'}
									to={`mailto:${links["social"]["email"]}`}
									data-tooltip-id="tooltip-area"
									data-tooltip-content="Email"
									data-tooltip-place="bottom"
								>
									<Icon type="Mail" theme="outline" size={24}/>
								</Hyperlink>
							</div>
						</div>
					</FlexCol>
					<FlexCol xs={24} sm={24} md={6} center={true}>
						<div className={CN.generate('image')}>
							<HeroCompactDiagram />
						</div>
					</FlexCol>
				</FlexRow>
			</Container>
			<span className={'hero-mouse'}/>
		</div>
	);
}

export default HeroSection;

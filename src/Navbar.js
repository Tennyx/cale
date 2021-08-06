import React, { useState, useEffect } from 'react';
import UseMediaQuery from './UseMediaQuery';

const generateEmail = () => {
	const foolTheBots = ['no', 'cale', 'spam', '.', 'email', 'switzer', 'for', '@gmail.com', 'me'];
	const email = foolTheBots[1] + foolTheBots[3] + foolTheBots[5] + foolTheBots[7];
	return email;
}

const Navbar = (props) => {
	const [toggleProjects, setToggleProjects] = useState(false);
	const [toggleContactLinks, setToggleContactLinks] = useState(false);
	const [showCategories, toggleCategories] = useState(false);
	const [emailField, setEmailField] = useState(generateEmail());

	let isPageWide = UseMediaQuery('(min-width: 800px)')

	const copyText = () => {
		const email = generateEmail();
		navigator.clipboard.writeText(email);
		setEmailField('Email copied to clipboard!');
		setTimeout(() => {
			setEmailField(generateEmail());
		}, 2000);
		
	}

	const selectProject = (project) => {
		if(!isPageWide){
			toggleCategories(false);
		}
		props.setContent(project)
	}

	const renderNavCategories = () => {
			return (
				<>
					<hr />

					<div className="label" onClick={() => setToggleProjects(!toggleProjects)}>projects</div>
					{
						toggleProjects
					?
						<> 
							{
								props.projects.map((project, i) => {
									if(project === props.currentContent){
										return <div className="sub-label selected" onClick={() => selectProject(project)} key={i}>{project.title}</div>
									}
									return <div className="sub-label" onClick={() => selectProject(project)} key={i}>{project.title}</div>
								})
							}
						</>
					:
						''
					}

					<div className="label" onClick={() => setToggleContactLinks(!toggleContactLinks)}>contact/links</div>
					{
						toggleContactLinks
					?
						<> 
							<div className="contact">
								<div className="sub-label" onClick={() => window.open('http://github.com/tennyx', '_blank', 'noopener,noreferrer')}>
									<svg className="contact-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
									github.com/Tennyx
								</div>
								<div className="sub-label" onClick={() => copyText()}>
									<svg className="contact-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/></svg>
									{emailField}
								</div>
							</div>
						</>
					:
						''
					}
				</>
			);
	}

	const renderNavBar = (screenType) => {
		let navClass;

		if(screenType === 'forDesktop'){
			navClass = 'side-bar';
			if(!showCategories){
				toggleCategories(true);
			}
		}
		else if(screenType === 'forMobile'){
			navClass = 'top-bar';
		}

		return (
			<div className={navClass}>
				<span className="label" onClick={() => props.setContent({"path": "/", "slug": ""})}>
					<span className="first-name">cale</span>
					<span className="last-name">switzer</span>
				</span>
				{ screenType === 'forMobile' ? <span className="hamburger-wrapper" onClick={() => toggleCategories(!showCategories)}><svg className="hamburger-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/></svg></span> : '' }
				
				{
					showCategories
				?
					renderNavCategories()
				:
					''
				}
			</div>
		);
	}

	useEffect(() => {
		if(!isPageWide){
			toggleCategories(false);
		}
	}, [isPageWide]);

	return (
		<>
			{
				isPageWide
			?
				renderNavBar('forDesktop')
			:
				renderNavBar('forMobile')
			}
		</>
	);
}

export default Navbar;
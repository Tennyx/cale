import React, { useState } from 'react';

const Projects = (props) => {
	const [currentLink, setCurrentLink] = useState('');

	const generateTechList = (techs) =>{
		let techList = [];

		for(const key in techs){
			if(techs[key].length !== 0){
				let subList = techs[key].map((tech, i) => <li className={key} key={`${key}${i}`}>{tech}</li>)
				techList.push(<div key={key}><li className={key}>{key}</li><ul>{subList}</ul></div>);	
			}
			else {
				techList.push(<li className={key} key={key}>{key}</li>);
			}
		}
		return techList;
	}

	const renderImage = (imgName) => {
		try{
			const requestImageFile = require.context('./img', true, /.png$/);
			return <img className="project-image" src={requestImageFile(`./${imgName}.png`).default} alt={imgName}/>
		}
		catch{
			return '';
		}
	}

	
	return (
		<div className="page-wrapper">
			<h1 className="project-title">{props.project.content.title}</h1>
			<span>
				{
					props.project.content.link
				?
					<svg className="link-image" onMouseOver={() => setCurrentLink(props.project.content.link)} onMouseLeave={() => setCurrentLink('')} onClick={() => window.open(props.project.content.link, '_blank', 'noopener,noreferrer')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/></svg>
				:
					''
				}
				<span className="project-link">{currentLink}</span>
			</span>
			<div className="image-container">
				{renderImage(props.project.content.slug)}
			</div>
			
			<h2>What is it?</h2>

			<p>
				<span className="opener">{props.project.content.title} is a {props.project.content.type}</span> {props.project.content.description}
			</p>

			<h2>Technologies Used:</h2>

			<ul>
				{generateTechList(props.project.content.technologies)}
			</ul>
		</div>
	);
}

export default Projects;
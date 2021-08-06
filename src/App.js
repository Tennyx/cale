import './App.css';
import React, { useState, useEffect } from 'react';
import projects from './projects.json'
import Navbar from './Navbar';
import Content from './Content';

const App = () => {
	const [currentContent, setCurrentContent] = useState({'path' : '/'});

	const setContent = (content) => {
		setCurrentContent(content);
		window.history.pushState(content.slug, 'Title', content.path + content.slug);
	}

	useEffect(() => {
		const pathArray = window.location.pathname.substr(1).split('/');

		for(let key in projects){
			if(projects[key].slug === pathArray[1]){
				setCurrentContent(projects[key])
			}
		}
	}, []);


	return (
		<>
			<Navbar projects={projects} setContent={setContent} currentContent={currentContent} />
			<Content content={currentContent} />
		</>
	);
}

export default App;

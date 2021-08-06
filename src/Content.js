import React from 'react';
import Home from './Home';
import Projects from './Projects';


const Content = (props) => {
	if(props.content.path === '/'){
		return <Home />
	}
	else if (props.content.path === '/projects/'){
		return <Projects project={props}/>
	}
}

export default Content;
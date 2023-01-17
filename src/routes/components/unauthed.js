import React from 'react';
import { useLocation, Navigate } from "react-router-dom";

import { UnauthedTemplate } from './../templates';

const UnauthedComponent = ({component: Component, token}) => {
	const navigateLocation = useLocation();
	const pathName = navigateLocation?.pathname;
	const queryParams = navigateLocation?.search??'';

	if(!token) {
		const nextPathUnauthed = localStorage.getItem('nextPathUnauthed');
		if(pathName === nextPathUnauthed) localStorage.removeItem('nextPathUnauthed');
		return (
			<UnauthedTemplate>
				<Component />
			</UnauthedTemplate>
		)
	} else {
		let nextPath;
		if(pathName) {
			nextPath = `${pathName}${queryParams}`;
			localStorage.setItem('nextPathUnauthed', nextPath);
		}
		const nextPathAuthed = localStorage.getItem('nextPathAuthed');

		return <Navigate to={nextPathAuthed??"/dashboard"} />
	}
}

export default UnauthedComponent;

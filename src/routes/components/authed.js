import React from 'react';
import { useLocation, Navigate } from "react-router-dom";

import { AuthedTemplate } from './../templates';

const AuthedComponent = ({component: Component, token}) => {
	const navigateLocation = useLocation();
	const pathName = navigateLocation?.pathname;
	const queryParams = navigateLocation?.search??'';

	if (token) {
		const nextPathAuthed = localStorage.getItem('nextPathAuthed');
		if (pathName === nextPathAuthed) localStorage.removeItem('nextPathAuthed');
		return (
			<AuthedTemplate>
				<Component />
			</AuthedTemplate>
		)
	} else {
		let nextPath;
		if (pathName) {
			nextPath = `${pathName}${queryParams}`;
			localStorage.setItem('nextPathAuthed', nextPath);
		}
		const nextPathUnauthed = localStorage.getItem('nextPathUnauthed');

		return <Navigate to={nextPathUnauthed??"/login"} />
	}
}

export default AuthedComponent;

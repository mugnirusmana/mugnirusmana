import React from 'react';
import { useLocation, Navigate } from "react-router-dom";

import { AuthedTemplate } from './../templates';

const AuthedComponent = ({component: Component, token}) => {
	const navigateLocation = useLocation();
	const nextLocation = navigateLocation?.pathname;
	let nextPath;
	if(nextLocation) {
		const nextQueryParams = navigateLocation?.search??'';
		nextPath = `${nextLocation}${nextQueryParams}`;
	}

	if(token) {
    return (
			<AuthedTemplate>
				<Component />
			</AuthedTemplate>
    )
	} else {
		if (nextPath) {
			const getNextPath = localStorage.getItem('nextPath');
			if(getNextPath) {
				localStorage.removeItem('nextPath');
			} else {
				localStorage.setItem('nextPath', nextPath);
			}
		}
		return <Navigate to={"/login"} />
	}
}

export default AuthedComponent;

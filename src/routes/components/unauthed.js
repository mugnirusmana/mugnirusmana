import React from 'react';
import { useLocation, Navigate } from "react-router-dom";

import { UnauthedTemplate } from './../templates';

const UnauthedComponent = ({component: Component, token}) => {
	const navigateLocation = useLocation();
	const nextLocation = navigateLocation?.pathname;
	let nextPath;
	if(nextLocation) {
		const nextQueryParams = navigateLocation?.search??'';
		nextPath = `${nextLocation}${nextQueryParams}`;
	}

	if(!token) {
		return (
			<UnauthedTemplate>
				<Component />
			</UnauthedTemplate>
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
		return <Navigate to={"/dashboard"} />
	}
}

export default UnauthedComponent;

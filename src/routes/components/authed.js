import React from 'react';
import { Navigate } from "react-router-dom";

import { AuthedTemplate } from './../templates';
import AccessDenied from '../../pages/access-denied';

const AuthedComponent = ({component: Component, token, accessRole, userRole}) => {
	if (token) {
		if (accessRole && accessRole !== userRole) {
			return (
				<AuthedTemplate>
					<AccessDenied />
				</AuthedTemplate>
			)
		} else {
			return (
				<AuthedTemplate>
					<Component />
				</AuthedTemplate>
			)
		}
	} else {
		return <Navigate to={"/login"} />
	}
}

export default AuthedComponent;

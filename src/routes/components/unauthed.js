import React from 'react';
import { Navigate } from "react-router-dom";

import { UnauthedTemplate } from './../templates';

const UnauthedComponent = ({component: Component, token}) => {
	if (!token) {
		return (
			<UnauthedTemplate>
				<Component />
			</UnauthedTemplate>
		)
	} else {
		return <Navigate to={"/dashboard"} />
	}
}

export default UnauthedComponent;

import React from 'react';

import { PublicTemplate } from './../templates';

const PublicComponent = ({component: Component}) => {
	return (
		<PublicTemplate>
			<Component />
		</PublicTemplate>
	)
}

export default PublicComponent;

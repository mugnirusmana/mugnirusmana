import React from "react";
import {
  Routes as WrapperRoutes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector } from 'react-redux';

import {
	AuthedComponent,
	UnauthedComponent,
	PublicComponent
} from './components';
import {
	UnauthedRoute,
	AuthedRoute,
	PublicRoute
} from './routes';
import NotFound from "./../pages/not-found";

const Routes = () => {
	const { token } = useSelector(({ auth }) => auth);
	return (
		<Router>
			<WrapperRoutes>
				{AuthedRoute.map((item, index) => {
					return (
						<Route
							exact={item.exact}
							key={index.toString()}
							path={item.path}
							element={(<AuthedComponent component={item.component} token={token} />)}
						/>
					)
				})}
				{UnauthedRoute.map((item, index) => {
					return (
						<Route
							exact={item.exact}
							key={index.toString()}
							path={item.path}
							element={(<UnauthedComponent component={item.component} token={token} />)}
						/>
					)
				})}
				{PublicRoute.map((item, index) => {
					return (
						<Route
							exact={item.exact}
							key={index.toString()}
							path={item.path}
							element={(<PublicComponent component={item.component} />)}
						/>
					)
				})}
				<Route path="*" element={<NotFound />} />
			</WrapperRoutes>
		</Router>
	)
}

export default Routes;
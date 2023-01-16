// imports authed pages
import Dashboard from './../pages/dashboard';

// imports unauthed pages
import Login from './../pages/login';

// imports public pages
import Home from './../pages/home';

const AuthedRoute = [
	{
		path: "/dashboard",
		component: Dashboard,
		exact: true,
	}
];

const UnauthedRoute = [
	{
		path: "/login",
		component: Login,
		exact: true,
	}
];

const PublicRoute = [
	{
		path: "/",
		component: Home,
		exact: true,
	}
];

export {
	AuthedRoute,
	PublicRoute,
	UnauthedRoute
}
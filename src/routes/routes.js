// imports authed pages
import Dashboard from './../pages/dashboard';
import Comments from '../pages/comments';

// imports unauthed pages
import Login from './../pages/login';

// imports public pages
import Home from './../pages/home';

const AuthedRoute = [
	{
		path: "/dashboard",
		component: Dashboard,
		exact: true,
	},
	{
		path: "/comments",
		component: Comments,
		exact: true,
	},
	{
		path: "/scan-qr",
		component: Comments,
		exact: true,
	},
	{
		path: "/settings",
		component: Comments,
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
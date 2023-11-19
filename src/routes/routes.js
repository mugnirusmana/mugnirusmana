// imports authed pages
import Dashboard from './../pages/dashboard';
import Comments from '../pages/comments';
import ScanQr from '../pages/scan-qr';
import Settings from '../pages/settings';

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
		component: ScanQr,
		exact: true,
	},
	{
		path: "/settings",
		component: Settings,
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
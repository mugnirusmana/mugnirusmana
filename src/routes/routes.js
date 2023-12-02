// imports authed pages
import Dashboard from './../pages/dashboard';
import BlockDomain from '../pages/block-domain';
import Attenders from '../pages/attenders';
import AttendersDetail from '../pages/attender-detail';
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
		path: "/block-domain",
		component: BlockDomain,
		accessRole: 'admin',
		exact: true,
	},
	{
		path: "/attenders",
		component: Attenders,
		exact: true,
	},
	{
		path: "/attenders/:id",
		component: AttendersDetail,
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
		accessRole: 'admin',
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
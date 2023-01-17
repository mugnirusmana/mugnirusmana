// imports authed pages
import Dashboard from './../pages/dashboard';
import Profile from './../pages/profile';

// imports unauthed pages
import Login from './../pages/login';
import ForgotPassword from './../pages/forgot-password';

// imports public pages
import Home from './../pages/home';

const AuthedRoute = [
	{
		path: "/dashboard",
		component: Dashboard,
		exact: true,
	},
	{
		path: "/profile",
		component: Profile,
		exact: true,
	}
];

const UnauthedRoute = [
	{
		path: "/login",
		component: Login,
		exact: true,
	},
	{
		path: "/forgot-password",
		component: ForgotPassword,
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
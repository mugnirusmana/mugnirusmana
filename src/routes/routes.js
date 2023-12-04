// imports authed pages
import Dashboard from './../pages/dashboard';
import BlockDomain from '../pages/block-domain';
import Attenders from '../pages/attenders';
import AttendersDetail from '../pages/attender-detail';
import ScanQr from '../pages/scan-qr';
import Settings from '../pages/settings';
import ChangePassword from '../pages/change-password';

// imports unauthed pages
import Login from './../pages/login';
import LoginNoPass from '../pages/login-no-pass';
import ForgotPassword from '../pages/forgot-password';
import ResetPassword from '../pages/reset-password';
import ActivateAccount from '../pages/activate-account';
import ActivateAccountValidate from '../pages/activate-account-validate';

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
	},
	{
		path: "/profile/change-password",
		component: ChangePassword,
		exact: true,
	},
];

const UnauthedRoute = [
	{
		path: "/login",
		component: Login,
		exact: true,
	},
	{
		path: "/login-no-pass",
		component: LoginNoPass,
		exact: true,
	},
	{
		path: "/forgot-password",
		component: ForgotPassword,
		exact: true,
	},
	{
		path: "/reset-password/:token",
		component: ResetPassword,
		exact: true,
	},
	{
		path: "/activate-account",
		component: ActivateAccount,
		exact: true,
	},
	{
		path: "/activate-account/:token",
		component: ActivateAccountValidate,
		exact: true,
	},
];

const PublicRoute = [
	{
		path: "/",
		component: Home,
		exact: true,
	},
];

export {
	AuthedRoute,
	PublicRoute,
	UnauthedRoute
}
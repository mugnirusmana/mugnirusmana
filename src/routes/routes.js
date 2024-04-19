// imports authed pages
import Dashboard from './../pages/dashboard';
import User from './../pages/user';
import UserCreate from './../pages/user-create';
import UserDetail from './../pages/user-detail';
import BlockDomain from '../pages/block-domain';
import Broadcast from '../pages/broadcast';
import BroadcastCreate from '../pages/broadcast-create';
import BroadcastDetail from '../pages/broadcast-detail';
import BroadcastEdit from '../pages/broadcast-edit';
import Attenders from '../pages/attenders';
import AttendersDetail from '../pages/attender-detail';
import ScanQrDesktop from '../pages/scan-qr-desktop';
import ScanQrMobile from '../pages/scan-qr-mobile';
import Settings from '../pages/settings';
import Profile from '../pages/profile';
import ChangePassword from '../pages/change-password';
import UpdateUsername from '../pages/update-username';

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
		path: "/user",
		component: User,
		accessRole: 'admin',
		exact: true,
	},
	{
		path: '/user/add',
		component: UserCreate,
		accessRole: 'admin',
		exact: true,
	},
	{
		path: "/user/detail/:id",
		component: UserDetail,
		accessRole: 'admin',
		exact: true,
	},
	{
		path: "/broadcast",
		component: Broadcast,
		accessRole: 'admin',
		exact: true,
	},
	{
		path: "/broadcast/create",
		component: BroadcastCreate,
		accessRole: 'admin',
		exact: true,
	},
	{
		path: "/broadcast/detail/:id",
		component: BroadcastDetail,
		accessRole: 'admin',
		exact: true,
	},
	{
		path: "/broadcast/edit/:id",
		component: BroadcastEdit,
		accessRole: 'admin',
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
		path: "/scan-qr-desktop",
		component: ScanQrDesktop,
		exact: true,
	},
	{
		path: "/scan-qr-mobile",
		component: ScanQrMobile,
		exact: true,
	},
	{
		path: "/settings",
		component: Settings,
		accessRole: 'admin',
		exact: true,
	},
	{
		path: "/profile",
		component: Profile,
		exact: true,
	},
	{
		path: "/profile/change-password",
		component: ChangePassword,
		exact: true,
	},
	{
		path: "/profile/update-username",
		component: UpdateUsername,
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
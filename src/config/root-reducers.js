import authSlice from './../redux/authSlice';
import sideMenuSlice from '../redux/sideMenuSlice';
import dashboardSlice from '../redux/dashboardSlice';

const rootReducer = {
  auth: authSlice,
  sideMenu: sideMenuSlice,
  dashboard: dashboardSlice,
}

export default rootReducer;
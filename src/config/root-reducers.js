import authSlice from './../redux/authSlice';
import sideMenuSlice from '../redux/sideMenuSlice';
import dashboardSlice from '../redux/dashboardSlice';
import attenderListSlice from '../redux/attenderListSlice';

const rootReducer = {
  auth: authSlice,
  sideMenu: sideMenuSlice,
  dashboard: dashboardSlice,
  attenderList: attenderListSlice,
}

export default rootReducer;
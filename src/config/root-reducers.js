import authSlice from './../redux/authSlice';
import sideMenuSlice from '../redux/sideMenuSlice';
import dashboardSlice from '../redux/dashboardSlice';
import attenderListSlice from '../redux/attenderListSlice';
import attenderDisplayedSlice from '../redux/attenderDisplayedSlice';
import attenderNotDisplayedSlice from '../redux/attenderNotDisplayedSlice';

const rootReducer = {
  auth: authSlice,
  sideMenu: sideMenuSlice,
  dashboard: dashboardSlice,
  attenderList: attenderListSlice,
  attenderDisplayed: attenderDisplayedSlice,
  attenderNotDisplayed: attenderNotDisplayedSlice,
}

export default rootReducer;
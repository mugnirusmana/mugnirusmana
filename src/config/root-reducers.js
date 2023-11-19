import authSlice from './../redux/authSlice';
import sideMenuSlice from '../redux/sideMenuSlice';

const rootReducer = {
  auth: authSlice,
  sideMenu: sideMenuSlice,
}

export default rootReducer;
import authSlice from './../redux/authSlice';
import sideMenuSlice from '../redux/sideMenuSlice';
import dashboardSlice from '../redux/dashboardSlice';
import attenderListSlice from '../redux/attenderListSlice';
import attenderDisplayedSlice from '../redux/attenderDisplayedSlice';
import attenderNotDisplayedSlice from '../redux/attenderNotDisplayedSlice';
import attenderRemoveSlice from '../redux/attenderRemoveSlice';
import attenderDetailSlice from '../redux/attenderDetailSlice';
import attenderAttendSlice from '../redux/attenderAttendSlice';
import reservationSlice from '../redux/reservationSlice';
import commentSlice from '../redux/commentSlice';
import settingSaveSlice from '../redux/settingSaveSlice';
import settingDetailSlice from '../redux/settingDetailSlice';

const rootReducer = {
  auth: authSlice,
  sideMenu: sideMenuSlice,
  dashboard: dashboardSlice,
  attenderList: attenderListSlice,
  attenderDisplayed: attenderDisplayedSlice,
  attenderNotDisplayed: attenderNotDisplayedSlice,
  attenderRemove: attenderRemoveSlice,
  attenderDetail: attenderDetailSlice,
  attenderAttend: attenderAttendSlice,
  reservation: reservationSlice,
  comment: commentSlice,
  settingSave: settingSaveSlice,
  settingDetail: settingDetailSlice,
}

export default rootReducer;
import authSlice from './../redux/authSlice';
import sideMenuSlice from '../redux/sideMenuSlice';
import dashboardSlice from '../redux/dashboardSlice';
import attenderListSlice from '../redux/attenderListSlice';
import attenderDisplayedSlice from '../redux/attenderDisplayedSlice';
import attenderNotDisplayedSlice from '../redux/attenderNotDisplayedSlice';
import attenderRemoveSlice from '../redux/attenderRemoveSlice';
import attenderDetailSlice from '../redux/attenderDetailSlice';
import attenderAttendSlice from '../redux/attenderAttendSlice';
import attenderQrSlice from '../redux/attenderQrSlice';
import reservationSlice from '../redux/reservationSlice';
import commentSlice from '../redux/commentSlice';
import settingSaveSlice from '../redux/settingSaveSlice';
import settingDetailSlice from '../redux/settingDetailSlice';
import settingSlice from '../redux/settingSlice';
import blockDomainListSlice from '../redux/blockDomainListSlice';
import blockDomainRemoveSlice from '../redux/blockDomainRemoveSlice';
import blockDomainCreateSlice from '../redux/blockDomainCreateSlice';

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
  attenderQr: attenderQrSlice,
  reservation: reservationSlice,
  comment: commentSlice,
  settingSave: settingSaveSlice,
  settingDetail: settingDetailSlice,
  setting: settingSlice,
  blockDomainList: blockDomainListSlice,
  blockDomainRemove: blockDomainRemoveSlice,
  blockDomainCreate: blockDomainCreateSlice,
}

export default rootReducer;
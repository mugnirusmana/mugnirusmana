import authSlice from './../redux/authSlice';
import loginNoPassSlice from './../redux/loginNoPassSlice';
import loginNoPassValidateSlice from './../redux/loginNoPassValidateSlice';
import forgotPasswordSlice from './../redux/forgotPasswordSlice';
import resetPasswordSlice from './../redux/resetPasswordSlice';
import activateAccountSlice from './../redux/activateAccountSlice';
import activateAccountValidateSlice from './../redux/activateAccountValidateSlice';
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
import profileSlice from '../redux/profileSlice';
import updateProfileSlice from '../redux/updateProfileSlice';
import changePasswordSlice from '../redux/changePasswordSlice';
import checkUsernameSlice from '../redux/checkUsernameSlice';
import updateUsernameSlice from '../redux/updateUsernameSlice';
import changeProfilePictureSlice from '../redux/changeProfilePictureSlice';
import userListSlice from '../redux/userListSlice';
import userInactiveSlice from '../redux/userInactiveSlice';
import userActiveSlice from '../redux/userActiveSlice';
import userDisableSlice from '../redux/userDisableSlice';
import userResetPasswordSlice from '../redux/userResetPasswordSlice';
import userDeleteSlice from '../redux/userDeleteSlice';
import userDetailSlice from '../redux/userDetailSlice';
import userCreateSlice from '../redux/userCreateSlice';
import broadcastListSlice from '../redux/broadcastListSlice';

const rootReducer = {
  auth: authSlice,
  loginNoPass: loginNoPassSlice,
  loginNoPassValidate: loginNoPassValidateSlice,
  forgotPassword: forgotPasswordSlice,
  resetPassword: resetPasswordSlice,
  activateAccount: activateAccountSlice,
  activateAccountValidate: activateAccountValidateSlice,
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
  profile: profileSlice,
  updateProfile: updateProfileSlice,
  changePassword: changePasswordSlice,
  checkUsername: checkUsernameSlice,
  updateUsername: updateUsernameSlice,
  changeProfilePicture: changeProfilePictureSlice,
  userList: userListSlice,
  userInactive: userInactiveSlice,
  userActive: userActiveSlice,
  userDisable: userDisableSlice,
  userResetPassword: userResetPasswordSlice,
  userDelete: userDeleteSlice,
  userDetail: userDetailSlice,
  userCreate: userCreateSlice,
  broadcastList: broadcastListSlice,
}

export default rootReducer;
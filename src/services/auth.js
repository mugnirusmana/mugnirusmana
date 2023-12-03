import axios from 'axios';
import ENV from './../config/base-env';

export const login = (params) => {
  let formData = new FormData();
  formData.set('email', params?.username);
  formData.set('password', params?.password);
  return axios.post(`${ENV.API}/login`, formData, {});
}

export const loginNoPass = (params) => {
  let formData = new FormData();
  formData.set('email', params?.email);
  return axios.post(`${ENV.API}/login-no-pass`, formData, {});
}

export const loginNoPassValidate = (params) => {
  let formData = new FormData();
  formData.set('email', params?.email);
  formData.set('code', params?.code);
  return axios.post(`${ENV.API}/login-no-pass-validate`, formData, {});
}

export const forgotPassword = (params) => {
  let formData = new FormData();
  formData.set('email', params?.email);
  return axios.post(`${ENV.API}/forgot-password`, formData, {});
}

export const resetPassword = (params) => {
  let formData = new FormData();
  formData.set('token', params?.token);
  formData.set('password', params?.password);
  return axios.post(`${ENV.API}/reset-password`, formData, {});
}

export const activateAccount = (params) => {
  let formData = new FormData();
  formData.set('email', params?.email);
  return axios.post(`${ENV.API}/activate-account`, formData, {});
}

export const activateAccountValidate = (params) => {
  let formData = new FormData();
  formData.set('token', params?.token);
  return axios.post(`${ENV.API}/activate-account-validate`, formData, {});
}
import axios from 'axios';
import ENV from './../config/base-env';

export const login = (params) => {
  let formData = new FormData();
  formData.set('email', params?.username);
  formData.set('password', params?.password);
  return axios.post(`${ENV.API}/login`, formData, {});
}
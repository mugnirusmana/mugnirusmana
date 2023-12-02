import axios from 'axios';
import ENV from './../config/base-env';

export const save = (params, token) => {
  return axios.post(`${ENV.API}/setting`, params, {
    headers: {
      Authorization: token
    }
  });
}

export const detail = (token) => {
  return axios.get(`${ENV.API}/setting/detail`, {
    headers: {
      Authorization: token
    }
  });
}

export const get = () => {
  return axios.get(`${ENV.API}/setting`);
}
import axios from 'axios';
import ENV from './../config/base-env';

export const getList = (params, token) => {
  const queryString = new URLSearchParams(params).toString();
  return axios.get(`${ENV.API}/users?${queryString}`, {
    headers: {
      Authorization: token
    }
  });
}

export const inactive = (id, token) => {
  return axios.get(`${ENV.API}/user/inactive/${id}`, {
    headers: {
      Authorization: token
    }
  });
}
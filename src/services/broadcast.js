import axios from 'axios';
import ENV from './../config/base-env';

export const getList = (params, token) => {
  const queryString = new URLSearchParams(params).toString();
  return axios.get(`${ENV.API}/broadcasts?${queryString}`, {
    headers: {
      Authorization: token
    }
  });
}
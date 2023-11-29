import axios from 'axios';
import ENV from './../config/base-env';

export const summary = (token) => {
  return axios.get(`${ENV.API}/dashboard`, {
    headers: {
      Authorization: token
    }
  });
}
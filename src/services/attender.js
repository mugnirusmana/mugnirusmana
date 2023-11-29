import axios from 'axios';
import ENV from './../config/base-env';

export const getList = (params, token) => {
  const queryString = new URLSearchParams(params).toString();
  return axios.get(`${ENV.API}/attenders?${queryString}`, {
    headers: {
      Authorization: token
    }
  });
}

export const displayed = (id, token) => {
  return axios.get(`${ENV.API}/attender/active/${id}`, {
    headers: {
      Authorization: token
    }
  });
}

export const notDisplayed = (id, token) => {
  return axios.get(`${ENV.API}/attender/inactive/${id}`, {
    headers: {
      Authorization: token
    }
  });
}
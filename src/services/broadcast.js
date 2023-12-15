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

export const sentToWhatsapp = (id, token) => {
  return axios.get(`${ENV.API}/broadcast/whatsapp/${id}`, {
    headers: {
      Authorization: token
    }
  });
}

export const sentToEmail = (id, token) => {
  return axios.get(`${ENV.API}/broadcast/email/${id}`, {
    headers: {
      Authorization: token
    }
  });
}
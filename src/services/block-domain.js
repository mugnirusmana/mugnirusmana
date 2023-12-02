import axios from 'axios';
import ENV from './../config/base-env';

export const getList = (params, token) => {
  const queryString = new URLSearchParams(params).toString();
  return axios.get(`${ENV.API}/block-domains?${queryString}`, {
    headers: {
      Authorization: token
    }
  });
}

export const create = (params, token) => {
  let formData = new FormData();
  formData.set('name', params?.name);
  return axios.post(`${ENV.API}/block-domain/`, formData, {
    headers: {
      Authorization: token
    }
  });
}

export const remove = (id, token) => {
  return axios.delete(`${ENV.API}/block-domain/${id}`, {
    headers: {
      Authorization: token
    }
  });
}
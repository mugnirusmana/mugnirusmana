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

export const create = (params, token) => {
  let formData = new FormData();
  formData.set('name', params?.name);
  formData.set('email', params?.email);
  formData.set('phone', params?.phone);
  return axios.post(`${ENV.API}/user`, formData, {
    headers: {
      Authorization: token
    }
  });
}

export const detail = (id, token) => {
  return axios.get(`${ENV.API}/user/${id}`, {
    headers: {
      Authorization: token
    }
  });
}

export const active = (id, token) => {
  return axios.get(`${ENV.API}/user/active/${id}`, {
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

export const disable = (id, token) => {
  return axios.get(`${ENV.API}/user/disable/${id}`, {
    headers: {
      Authorization: token
    }
  });
}

export const resetPassword = (id, token) => {
  return axios.get(`${ENV.API}/user/reset-password/${id}`, {
    headers: {
      Authorization: token
    }
  });
}

export const remove = (id, token) => {
  return axios.delete(`${ENV.API}/user/${id}`, {
    headers: {
      Authorization: token
    }
  });
}
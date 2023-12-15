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

export const create = (params, token) => {
  let formData = new FormData();
  formData.set('name', params?.name);
  formData.set('whatsapp', params?.whatsapp);
  formData.set('email', params?.email);
  return axios.post(`${ENV.API}/broadcast/`, formData, {
    headers: {
      Authorization: token
    }
  });
}

export const detail = (id, token) => {
  return axios.get(`${ENV.API}/broadcast/${id}`, {
    headers: {
      Authorization: token
    }
  });
}

export const update = (id, params, token) => {
  let formData = new FormData();
  formData.set('name', params?.name);
  formData.set('whatsapp', params?.whatsapp);
  formData.set('email', params?.email);
  formData.set('_method', 'PUT');
  return axios.post(`${ENV.API}/broadcast/${id}`, {
    headers: {
      Authorization: token
    }
  });
}

export const remove = (id, token) => {
  return axios.delete(`${ENV.API}/broadcast/${id}`, {
    headers: {
      Authorization: token
    }
  });
}

export const importExcel = (params, token) => {
  let formData = new FormData();
  formData.set('excel', params?.excel);
  return axios.post(`${ENV.API}/broadcast/import`, {
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
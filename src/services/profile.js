import axios from 'axios';
import ENV from './../config/base-env';

export const get = (token) => {
  return axios.get(`${ENV.API}/profile`, {
    headers: {
      Authorization: token,
    }
  });
}

export const update = (params, token) => {
  let formData = new FormData();
  formData.set('name', params?.name);
  formData.set('phone', params?.phone);
  formData.set('_method', 'PUT');
  return axios.post(`${ENV.API}/profile`, formData, {
    headers: {
      Authorization: token,
    }
  });
}

export const changePassword = (params, token) => {
  let formData = new FormData();
  formData.set('current_password', params?.current_password);
  formData.set('new_password', params?.new_password);
  return axios.post(`${ENV.API}/profile/change-password`, formData, {
    headers: {
      Authorization: token,
    }
  });
}

export const checkUsername = (params, token) => {
  let formData = new FormData();
  formData.set('username', params?.username);
  return axios.post(`${ENV.API}/profile/check-username`, formData, {
    headers: {
      Authorization: token,
    }
  });
}

export const updateUsername = (params, token) => {
  let formData = new FormData();
  formData.set('username', params?.username);
  return axios.post(`${ENV.API}/profile/change-username`, formData, {
    headers: {
      Authorization: token,
    }
  });
}

export const changePicture = (params, token) => {
  let formData = new FormData();
  formData.set('image', params?.image);
  return axios.post(`${ENV.API}/profile/change-picture`, formData, {
    headers: {
      Authorization: token,
    }
  });
}
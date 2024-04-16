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

export const getDetail = (id, token) => {
  return axios.get(`${ENV.API}/attender/${id}`, {
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

export const remove = (id, token) => {
  return axios.delete(`${ENV.API}/attender/${id}`, {
    headers: {
      Authorization: token
    }
  });
}

export const attend = (dataScan, token) => {
  return axios.put(`${ENV.API}/attender/attend`, {
    token: dataScan
  }, {
    headers: {
      Authorization: token
    }
  });
}

export const submitReservation = (params, token) => {
  let formData = new FormData();
  formData.set('name', params?.fullname);
  formData.set('email', params?.email);
  formData.set('participants', params?.participant);
  formData.set('attendance', params?.attendance);
  formData.set('comment', params?.comment);
  return axios.post(`${ENV.API}/attender`, formData, {
    headers: {
      Authorization: token
    }
  })
}

export const getCommentList = () => {
  return axios.get(`${ENV.API}/attender/displayed-comments`);
}

export const regenerateQr = (id, token) => {
  return axios.get(`${ENV.API}/attender/regenerate-qr/${id}`, {
    headers: {
      Authorization: token
    }
  });
}
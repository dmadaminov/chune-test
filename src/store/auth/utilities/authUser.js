import axios from 'axios';
import { API } from '../../../utilities/APIConfig';

API.defaults.headers.post['Content-Type'] = 'application/json';

export const getTokenToServer = (email, password, name, newUser) => {
  let data = null;
  if (name) {
    data = JSON.stringify({
      email,
      name,
      password
    });
  } else {
    data = JSON.stringify({
      email,
      password
    });
  }
  if (newUser) return API.post('users/', data).then(response => response.data.token);
  return API.post('users/login', data).then(response => response.data.token);
};

export const tokenVerifyCreate = (token) => {
  const data = JSON.stringify({
    token
  });
  return API.post('token/verify', data).then(response => response.data.token);
};

export const refreshToken = (token) => {
  const data = JSON.stringify({
    token
  });
  return API.post('token/refresh', data).then(response => response.data.token);
};

export const getProfileUserSocial = (token) => {
  const url = `https://graph.facebook.com/v3.1/me${token}`;
  return axios.get(url)
    .then(response => response);
};

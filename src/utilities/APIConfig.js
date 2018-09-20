import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://chune-api.herokuapp.com/api/v1/',
});

export const setUserToken = (token) => {
  API.defaults.headers.common.Authorization = `JWT ${token}`;
};

export const clearUserToken = () => {
  API.defaults.headers.common.Authorization = null;
};

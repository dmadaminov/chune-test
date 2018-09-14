import axios from 'axios';

export const getList = (token) => {
  const url = 'https://chune-api.herokuapp.com/api/v1/artists/';
  return axios.get(url, {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
    .then(response => response);
};

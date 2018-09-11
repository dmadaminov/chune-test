import axios from 'axios';

export const getTokenToServer = (email, password, newUser) => {
  const data = JSON.stringify({
    email,
    password
  });
  if (newUser) {
    return axios.post('https://chune-api.herokuapp.com/api/v1/users/', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.data).catch(e => e);
  }
  return axios.post('https://chune-api.herokuapp.com/api/v1/users/login', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.data).catch(e => e);
};

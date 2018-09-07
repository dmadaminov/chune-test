import axios from 'axios';

export const getTokenToServer = (email, password) => {
  const data = JSON.stringify({
    email,
    password
  });
  return axios.post('https://chune-api.herokuapp.com/api/v1/users/', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

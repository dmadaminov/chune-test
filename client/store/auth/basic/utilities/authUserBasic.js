import axios from 'axios';

export const getTokenToServer = (email, password) => {
  console.log(email, ' email', password, ' password', ' authUser');
  const data = JSON.stringify({
    email,
    password
  });
  console.log(data, ' data');
  return axios.post('https://chune-api.herokuapp.com/api/v1/users/', data, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.data).catch(e => e);
};

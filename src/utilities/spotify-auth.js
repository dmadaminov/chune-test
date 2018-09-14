import axios from 'axios';

export function getUserProfileSpotify(token) {
  return axios.get(`https://api.spotify.com/v1/me${token}`)
    .then(response => response)
    .catch(error => error);
}

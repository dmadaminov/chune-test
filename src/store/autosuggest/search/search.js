import axios from 'axios';

export const getListArtistsToServer = (value, token) => {
  const url = `https://chune-api.herokuapp.com/api/v1/artists/search/${value}/`;
  return axios.get(url, {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
    .then(response => response.data);
};

export const getInfoSingleArtist = (name, token) => {
  const url = `https://chune-api.herokuapp.com/api/v1/artists/${name}/`;
  return axios.get(url, {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
    .then(response => response.data);
};

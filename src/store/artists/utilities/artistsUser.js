import axios from 'axios';
import { API } from '../../../utilities/axiosConfig';

export const getList = () => API.get('artists/');

export const postArtist = (name, token) => {
  const url = `https://chune-api.herokuapp.com/api/v1/artists/${name}/`;
  return axios.post(url, null, {
    headers: {
      Authorization: `JWT ${token}`
    }
  });
};

export const deleteArtist = (name, token) => {
  const url = `https://chune-api.herokuapp.com/api/v1/artists/${name}/`;
  return axios.delete(url, {
    headers: {
      Authorization: `JWT ${token}`
    }
  });
};

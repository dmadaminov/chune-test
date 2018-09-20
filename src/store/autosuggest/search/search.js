import { API } from '../../../utilities/APIConfig';

export const getListArtistsToServer = value => API.get(`artists/search/${value}/`).then(response => response.data);
export const getInfoSingleArtist = name => API.get(`artists/${name}/`).then(response => response.data);

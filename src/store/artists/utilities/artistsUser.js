import { API } from '../../../utilities/APIConfig';

export const getList = () => API.get('artists/');
export const postArtist = name => API.post(`artists/${name}/`);
export const deleteArtist = name => API.delete(`artists/${name}/`);

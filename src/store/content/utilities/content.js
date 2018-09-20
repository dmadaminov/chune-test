import { API } from '../../../utilities/APIConfig';

export const getContentToServer = (follow, pages) => {
  if (follow) return API.get(`content/?filter=follow&start=${pages}&max_results=5`).then(response => response.data);
  return API.get(`content/?filter=recent&start=${pages}&max_results=5`).then(response => response.data);
};
export const getTopTracksToServer = () => API.get('tracks/sources/2').then(response => response.data);
export const getChuneSupplyToServer = () => API.get('tracks/sources/1').then(response => response.data);

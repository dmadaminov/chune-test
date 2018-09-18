import { API } from '../../../utilities/APIConfig';

export const getContentToServer = (follow) => {
  if (follow) return API.get('content/').then(response => response.data);
  return API.get('content/?filter=recent').then(response => response.data);
};

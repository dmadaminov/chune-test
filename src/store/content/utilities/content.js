import { API } from '../../../utilities/APIConfig';

export const getContentToServer = () => API.get('content/');

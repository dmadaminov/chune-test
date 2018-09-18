import { GET_CONTENT_HOMEPAGE, SUCCESS_GET_CONTENT_HOMEPAGE } from './types';

export const getContentHomepage = () => ({
  type: GET_CONTENT_HOMEPAGE
});
export const successGetContentHomepage = (artistTracks, contentFeed) => ({
  type: SUCCESS_GET_CONTENT_HOMEPAGE,
  payload: { artistTracks, contentFeed }
});

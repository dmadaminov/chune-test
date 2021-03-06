import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  artistTracks: [],
  contentFeed: [],
  pages: 0,
  topTracks: [],
  topChune: [],
  url: '',
  title: ''
};

const getContentUser = state => ({ ...state });
const successGetContentUser = (state, { artistTracks, contentFeed }) => {
  // const traks = state.artistTracks.concat(artistTracks);
  // const content = state.contentFeed.concat(contentFeed);
  return ({
    ...state,
    artistTracks: artistTracks,
    contentFeed: contentFeed,
    pages: state.pages + 1
  });
};
const fethcMoreContentUser = state => ({ ...state });
const successGetTopTracks = (state, { topTracks }) => ({ ...state, topTracks });
const successGetChuneSupply = (state, { topChune }) => ({ ...state, topChune });
const openArticleUrl = (state, { url, title }) => ({ ...state, url, title });

const handlers = {
  [TYPES.GET_CONTENT_USER]: getContentUser,
  [TYPES.SUCCESS_GET_CONTENT_USER]: successGetContentUser,
  [TYPES.FETCH_MORE_CONTENT_USER]: fethcMoreContentUser,
  [TYPES.SUCCESS_GET_TOP_TRACKS]: successGetTopTracks,
  [TYPES.SUCCESS_GET_CHUNE_SUPPLY]: successGetChuneSupply,
  [TYPES.OPEN_ARTICLE_URL]: openArticleUrl
};

export const reducerContent = createReducer(initState, handlers);

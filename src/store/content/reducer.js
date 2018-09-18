import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  artistTracks: {},
  contentFeed: {}
};

const getContentHomepage = state => ({ ...state });
const successGetContentHomepage = (state, { artistTracks, contentFeed }) => ({ ...state, artistTracks, contentFeed });

const handlers = {
  [TYPES.GET_CONTENT_HOMEPAGE]: getContentHomepage,
  [TYPES.SUCCESS_GET_CONTENT_HOMEPAGE]: successGetContentHomepage
};

export const reducerContent = createReducer(initState, handlers);

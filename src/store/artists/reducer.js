import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  artists: [],
  artist: {}
};

const successGetUserArtists = (state, { artists }) => ({ ...state, artists });
const successGetInfoArtist = (state, { artist }) => ({ ...state, artist });

const handlers = {
  [TYPES.SUCCESS_GET_USER_ARTISTS]: successGetUserArtists,
  [TYPES.SUCCESS_GET_INFO_ARTIST]: successGetInfoArtist
};

export const reducerArtists = createReducer(initState, handlers);

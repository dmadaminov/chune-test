import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  artists: []
};

const successGetUserArtists = (state, { artists }) => ({ ...state, artists });

const handlers = {
  [TYPES.SUCCESS_GET_USER_ARTISTS]: successGetUserArtists
};

export const reducerArtists = createReducer(initState, handlers);

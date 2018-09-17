import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  artists: [],
  artist: {},
  name: ''
};

const successGetUserArtists = (state, { artists }) => ({ ...state, artists });
const successGetInfoArtist = (state, { artist }) => ({ ...state, artist });
const followArtist = (state, { name }) => ({ ...state, name });
const successFollowArtist = state => ({ ...state });
const unfollowArtist = (state, { name }) => ({ ...state, name });
const successUnfollowArtist = state => ({ ...state });

const handlers = {
  [TYPES.SUCCESS_GET_USER_ARTISTS]: successGetUserArtists,
  [TYPES.SUCCESS_GET_INFO_ARTIST]: successGetInfoArtist,
  [TYPES.FOLLOW_ARTIST]: followArtist,
  [TYPES.SUCCESS_FOLLOW_ARTIST]: successFollowArtist,
  [TYPES.UNFOLLOW_ARTIST]: unfollowArtist,
  [TYPES.SUCCESS_UNFOLLOW_ARTIST]: successUnfollowArtist
};

export const reducerArtists = createReducer(initState, handlers);

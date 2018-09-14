import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  modal: false,
  playlist: [],
  track: null,
  currentTime: null,
  playMusic: false
};

const closeMusicPlayer = state => ({ ...state, modal: false });
const getMusicPlaylist = (state, { playlist }) => ({ ...state, playlist });
const playMusicTrack = (state, { track }) => ({
  ...state,
  playMusic: true,
  track,
  modal: true
});
const pauseMusicPlayer = (state, { currentTime }) => ({ ...state, currentTime, playMusic: false });

const handlers = {
  [TYPES.CLOSE_MUSIC_PLAYER]: closeMusicPlayer,
  [TYPES.GET_MUSIC_PLAYLIST]: getMusicPlaylist,
  [TYPES.PLAY_MUSIC_PLAYER]: playMusicTrack,
  [TYPES.PAUSE_MUSIC_PLAYER]: pauseMusicPlayer
};

export const reducerMusicPlayer = createReducer(initState, handlers);

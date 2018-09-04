import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

const initState = {
  modal: false,
  playlist: [],
  track: {},
  currentTime: null,
  playMusic: false,

};

const openMusicPlayer = state => ({ ...state, modal: true });

const closeMusicPlayer = state => ({ ...state, modal: false });

const getMusicPlaylist = (state, { playlist }) => ({ ...state, playlist });

const getMusicTrack = (state, { track }) => ({ ...state, track });

const playMusicTrack = state => ({ ...state, playMusic: true });

const pauseMusicPlayer = (state, { currentTime }) => ({ ...state, currentTime });

const handlers = {
  [TYPES.OPEN_MUSIC_PLAYER]: openMusicPlayer,
  [TYPES.CLOSE_MUSIC_PLAYER]: closeMusicPlayer,
  [TYPES.GET_MUSIC_PLAYLIST]: getMusicPlaylist,
  [TYPES.GET_MUSIC_TRACK]: getMusicTrack,
  [TYPES.PLAY_MUSIC_PLAYER]: playMusicTrack,
  [TYPES.PAUSE_MUSIC_PLAYER]: pauseMusicPlayer
};

export const REDUCERMUSICPLAYER = createReducer(initState, handlers);

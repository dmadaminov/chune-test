import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

const initState = {
  modal: false,
  playlist: [],
  track: null,
  currentTime: null,
  playMusic: false,

};

const openMusicPlayer = state => ({ ...state, modal: true });

const closeMusicPlayer = state => ({ ...state, modal: false });

const getMusicPlaylist = (state, { playlist }) => ({ ...state, playlist });

const playMusicTrack = (state, { track }) => ({ ...state, playMusic: true, track });

const pauseMusicPlayer = (state, { currentTime }) => ({ ...state, currentTime, playMusic: false });

const handlers = {
  [TYPES.OPEN_MUSIC_PLAYER]: openMusicPlayer,
  [TYPES.CLOSE_MUSIC_PLAYER]: closeMusicPlayer,
  [TYPES.GET_MUSIC_PLAYLIST]: getMusicPlaylist,
  [TYPES.PLAY_MUSIC_PLAYER]: playMusicTrack,
  [TYPES.PAUSE_MUSIC_PLAYER]: pauseMusicPlayer
};

export const REDUCERMUSICPLAYER = createReducer(initState, handlers);

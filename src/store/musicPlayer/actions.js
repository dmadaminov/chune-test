import {
  CLOSE_MUSIC_PLAYER, GET_MUSIC_PLAYLIST,
  PLAY_MUSIC_PLAYER, PAUSE_MUSIC_PLAYER
} from './types';

export const closeMusicPlayer = () => ({
  type: CLOSE_MUSIC_PLAYER
});

export const getMusicPlaylist = playlist => ({
  type: GET_MUSIC_PLAYLIST,
  payload: { playlist }
});

export const playMusicPlayer = track => ({
  type: PLAY_MUSIC_PLAYER,
  payload: { track }
});

export const pauseMusicPlayer = currentTime => ({
  type: PAUSE_MUSIC_PLAYER,
  payload: { currentTime }
});

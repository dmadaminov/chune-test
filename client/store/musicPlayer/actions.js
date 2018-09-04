import {
  OPEN_MUSIC_PLAYER, CLOSE_MUSIC_PLAYER, GET_MUSIC_PLAYLIST,
  GET_MUSIC_TRACK, PLAY_MUSIC_PLAYER, PAUSE_MUSIC_PLAYER
} from './types';

export const openMusicPlayer = () => ({
  type: OPEN_MUSIC_PLAYER
});

export const closeMusicPlayer = () => ({
  type: CLOSE_MUSIC_PLAYER
});

export const getMusicPlaylist = playlist => ({
  type: GET_MUSIC_PLAYLIST,
  payload: { playlist }
});

export const getMusicTrack = track => ({
  type: GET_MUSIC_TRACK,
  payload: { track }
});

export const playMusicPlayer = () => ({
  type: PLAY_MUSIC_PLAYER
});

export const pauseMusicPlayer = currentTime => ({
  type: PAUSE_MUSIC_PLAYER,
  payload: { currentTime }
});
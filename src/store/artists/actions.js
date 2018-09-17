import {
  SUCCESS_GET_USER_ARTISTS, SUCCESS_GET_INFO_ARTIST, FOLLOW_ARTIST,
  SUCCESS_FOLLOW_ARTIST, UNFOLLOW_ARTIST, SUCCESS_UNFOLLOW_ARTIST
} from './types';

export const successGetUserArtists = artists => ({
  type: SUCCESS_GET_USER_ARTISTS,
  payload: { artists }
});
export const successGetInfoArtist = artist => ({
  type: SUCCESS_GET_INFO_ARTIST,
  payload: { artist }
});
export const followArtist = name => ({
  type: FOLLOW_ARTIST,
  payload: { name }
});
export const successFollowArtist = () => ({
  type: SUCCESS_FOLLOW_ARTIST
});
export const unfollowArtist = name => ({
  type: UNFOLLOW_ARTIST,
  payload: { name }
});
export const successUnfollowArtist = () => ({
  type: SUCCESS_UNFOLLOW_ARTIST
});

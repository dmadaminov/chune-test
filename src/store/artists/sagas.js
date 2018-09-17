import {
  put, takeEvery, call,
  select
} from 'redux-saga/effects';
// import { REHYDRATE } from 'redux-persist';

import { SUCCESS_GET_TOKEN } from '../auth/types';
import { errorMessage } from '../error/actions';
import { getList, postArtist, deleteArtist } from './utilities/artistsUser';
import { successGetUserArtists, successFollowArtist, successUnfollowArtist } from './actions';
import {
  FOLLOW_ARTIST, UNFOLLOW_ARTIST, SUCCESS_FOLLOW_ARTIST,
  SUCCESS_UNFOLLOW_ARTIST
} from './types';
import { getToken } from '../autosuggest/search/selectors';

export function* getListArtistsUser({ payload }) {
  let accessToken = '';
  if (payload) accessToken = payload.token;
  else accessToken = (yield select(getToken));
  try {
    const { data } = yield call(getList, accessToken);
    yield put(successGetUserArtists(data));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}
export function* postFollowArtist({ payload }) {
  const { name } = payload;
  const token = yield select(getToken);
  try {
    yield call(postArtist, name, token);
    yield put(successFollowArtist());
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}
export function* deleteFollowArtist({ payload }) {
  const { name } = payload;
  const token = yield select(getToken);
  try {
    yield call(deleteArtist, name, token);
    yield put(successUnfollowArtist());
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasArtists() {
  yield takeEvery([SUCCESS_GET_TOKEN, SUCCESS_FOLLOW_ARTIST, SUCCESS_UNFOLLOW_ARTIST], getListArtistsUser);
  yield takeEvery(FOLLOW_ARTIST, postFollowArtist);
  yield takeEvery(UNFOLLOW_ARTIST, deleteFollowArtist);
}

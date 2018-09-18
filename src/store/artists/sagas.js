import { put, takeEvery, call } from 'redux-saga/effects';
// import { uniqWith, isEqual } from 'lodash';
// import { REHYDRATE } from 'redux-persist';

import { SUCCESS_GET_TOKEN } from '../auth/types';
import { errorMessage } from '../error/actions';
import { getList, postArtist, deleteArtist } from './utilities/artistsUser';
import { successGetUserArtists, successFollowArtist, successUnfollowArtist } from './actions';
import {
  FOLLOW_ARTIST, UNFOLLOW_ARTIST, SUCCESS_FOLLOW_ARTIST,
  SUCCESS_UNFOLLOW_ARTIST
} from './types';

export function* getListArtistsUser() {
  try {
    const { data } = yield call(getList);
    // let relatedArtists = [];
    // data.forEach((e) => { relatedArtists = relatedArtists.concat(e.recommended); });
    // const objArtists = data.reduce((acc, item) => ({ ...acc, [item.id]: { id: item.id } }), {});
    // relatedArtists = uniqWith(relatedArtists, isEqual);
    // console.log();
    // console.log(relatedArtists, ' obj ', objArtists);
    // console.log();
    // const relatedArtists = data.reduce((acc, item) => ([...acc, ...item.recommended]), []);
    // console.log(relatedArtists, 'relatedArtists');
    yield put(successGetUserArtists(data));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}
export function* postFollowArtist({ payload }) {
  const { name } = payload;
  try {
    yield call(postArtist, name);
    yield put(successFollowArtist());
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}
export function* deleteFollowArtist({ payload }) {
  const { name } = payload;
  try {
    yield call(deleteArtist, name);
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

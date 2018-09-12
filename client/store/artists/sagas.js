import { put, takeEvery, call } from 'redux-saga/effects';
// import { REHYDRATE } from 'redux-persist';

import { SUCCESS_GET_TOKEN } from '../auth/types';
import { errorMessage } from '../error/actions';
import { getList } from './utilities/artistsUser';
import { successGetUserArtists } from './actions';

export function* getListArtistsUser({ payload }) {
  const { token } = payload;
  console.log(payload);
  try {
    const artists = yield call(getList, token);
    yield put(successGetUserArtists(artists));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasArtists() {
  yield takeEvery(SUCCESS_GET_TOKEN, getListArtistsUser);
}

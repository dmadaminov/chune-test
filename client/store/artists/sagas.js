import { put, takeEvery, call } from 'redux-saga/effects';
// import { REHYDRATE } from 'redux-persist';

import { SUCCESS_GET_TOKEN } from '../auth/types';
import { errorMessage } from '../error/actions';
import { getList } from './utilities/artistsUser';
import { successGetUserArtists } from './actions';

export function* getListArtistsUser({ payload }) {
  const { token } = payload;
  try {
    const { data } = yield call(getList, token);
    yield put(successGetUserArtists(data));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasArtists() {
  yield takeEvery(SUCCESS_GET_TOKEN, getListArtistsUser);
}

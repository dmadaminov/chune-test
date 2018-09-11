import { put, takeEvery, call } from 'redux-saga/effects';

import { SUCCESS_GET_TOKEN_SOCIAL } from './types';
import { successGetProfileSocial } from './actions';
import { getProfileUserSocial } from './utilities/authUserSocial';
import { errorMessage } from '../../error/actions';

export function* getProfile({ payload }) {
  const { token } = payload;
  try {
    const profile = yield call(getProfileUserSocial, token);
    yield put(successGetProfileSocial(profile));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasAuthUserSocial() {
  yield takeEvery(SUCCESS_GET_TOKEN_SOCIAL, getProfile);
}

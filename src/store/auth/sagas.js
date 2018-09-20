import { put, takeEvery, call } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';

import {
  getTokenToServer, getProfileUserSocial,
  tokenVerifyCreate, refreshToken
} from './utilities/authUser';
import { CREATE_NEW_USER, LOGIN_USER, SUCCESS_GET_TOKEN } from './types';
import { successGetToken, successGetProfileSocial } from './actions';
import { errorMessage } from '../error/actions';
import { setUserToken } from '../../utilities/APIConfig';

export function* getTokenUser(action) {
  const { email, password, name } = action.payload;
  let newUser = true;
  if (action.type === 'CREATE_NEW_USER') newUser = true;
  else if (action.type === 'LOGIN_USER') newUser = false;
  try {
    const token = yield call(getTokenToServer, email, password, name, newUser);
    setUserToken(token);
    yield put(successGetToken(token));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}
export function* rehydrateAuth({ payload }) {
  if (payload) {
    if (payload.dataAuth.token !== '') {
      const { token } = payload.dataAuth;
      let verifyToken = yield call(tokenVerifyCreate, token);
      if (verifyToken !== token) {
        verifyToken = yield call(refreshToken, token);
      }
      setUserToken(verifyToken);
      try {
        yield put(successGetToken(verifyToken));
      } catch (e) {
        yield put(errorMessage(e.message));
      }
    }
  }
}
export function* getProfile({ payload }) {
  const { token } = payload;
  const stg = '?access_token=';
  if (!token.includes(stg)) return;
  try {
    const profile = yield call(getProfileUserSocial, token);
    yield put(successGetProfileSocial(profile));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasAuthUser() {
  yield takeEvery([CREATE_NEW_USER, LOGIN_USER], getTokenUser);
  yield takeEvery(REHYDRATE, rehydrateAuth);
  yield takeEvery(SUCCESS_GET_TOKEN, getProfile);
}

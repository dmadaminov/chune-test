import { put, takeEvery, call } from 'redux-saga/effects';

import { getTokenToServer } from './utilities/authUserBasic';
import { CREATE_NEW_USER_BASIC } from './types';
import { successCreateNewUserBasic } from './actions';
import { errorMessage } from '../../error/actions';

function* getTokenUser({ payload }) {
  const { email, password } = payload;
  console.log(email, ' email', password, ' password', ' sagas');
  try {
    const token = yield call(getTokenToServer, email, password);
    console.log(token, ' token', ' sagas');
    yield put(successCreateNewUserBasic(token));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasAuthUserBasic() {
  yield takeEvery(CREATE_NEW_USER_BASIC, getTokenUser);
}

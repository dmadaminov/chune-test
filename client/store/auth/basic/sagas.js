import { put, takeEvery, call } from 'redux-saga/effects';

import { getTokenToServer } from './utilities/authUserBasic';
import { CREATE_NEW_USER_BASIC, LOGIN_USER_BASIC } from './types';
import { successGetTokenBasic } from './actions';
import { errorMessage } from '../../error/actions';

function* getTokenUser(action) {
  const { email, password } = action.payload;
  let newUser = true;
  if (action.type === 'CREATE_NEW_USER_BASIC') newUser = true;
  else if (action.type === 'LOGIN_USER_BASIC') newUser = false;
  try {
    const { token } = yield call(getTokenToServer, email, password, newUser);
    yield put(successGetTokenBasic(token));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasAuthUserBasic() {
  yield takeEvery([CREATE_NEW_USER_BASIC, LOGIN_USER_BASIC], getTokenUser);
}

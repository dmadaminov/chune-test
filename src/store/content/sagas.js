import { put, takeEvery, call } from 'redux-saga/effects';

import { SUCCESS_GET_TOKEN } from '../auth/types';
import { errorMessage } from '../error/actions';
import { successGetContentHomepage } from './actions';
import { getContentToServer } from './utilities/content';

export function* getContent() {
  try {
    const content = yield call(getContentToServer);
    console.log(content, 'content');
    yield put(successGetContentHomepage(content));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasContent() {
  yield takeEvery(SUCCESS_GET_TOKEN, getContent);
}

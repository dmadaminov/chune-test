import { put, takeEvery, call } from 'redux-saga/effects';

import { SUCCESS_GET_TOKEN } from '../auth/types';
import { errorMessage } from '../error/actions';
import { successGetContentHomepage } from './actions';
import { getContentToServer } from './utilities/content';

export function* getContent() {
  try {
    const data = yield call(getContentToServer);
    const artistTracks = data.artist_tracks;
    const contentFeed = data.content_feed;
    yield put(successGetContentHomepage(artistTracks, contentFeed));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasContent() {
  yield takeEvery(SUCCESS_GET_TOKEN, getContent);
}

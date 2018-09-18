import { put, takeEvery, call } from 'redux-saga/effects';

import { SUCCESS_GET_USER_ARTISTS } from '../artists/types';
import { errorMessage } from '../error/actions';
import { successGetContentHomepage } from './actions';
import { getContentToServer } from './utilities/content';

export function* getContent({ payload }) {
  const { artists } = payload;
  let follow = false;
  if (artists.length > 0) follow = true;
  try {
    const data = yield call(getContentToServer, follow);
    const artistTracks = data.artist_tracks || [];
    const contentFeed = data.content_feed;
    yield put(successGetContentHomepage(artistTracks, contentFeed));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasContent() {
  yield takeEvery(SUCCESS_GET_USER_ARTISTS, getContent);
}

import { put, call, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { SEARCH_ARTISTS, SEARCH_SELECT_ARTIST } from './types';
import { getListArtistsToServer, getInfoSingleArtist } from './search/search';
import { successSearchArtists } from './actions';
import { errorMessage } from '../error/actions';
import { successGetInfoArtist } from '../artists/actions';

function* getListArtists({ payload }) {
  const { value } = payload;
  try {
    const suggestions = yield call(getListArtistsToServer, value);
    yield put(successSearchArtists(suggestions));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

function* getInfoArtist({ payload }) {
  const { name } = payload;
  try {
    const artist = yield call(getInfoSingleArtist, name);
    yield put(successGetInfoArtist(artist));
    yield put(push(`/artist/${artist.name}`));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasSearch() {
  yield takeEvery(SEARCH_ARTISTS, getListArtists);
  yield takeEvery(SEARCH_SELECT_ARTIST, getInfoArtist);
}

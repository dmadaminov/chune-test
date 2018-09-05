import { put, takeEvery } from 'redux-saga/effects';
import { ADD_USER } from '../user';
import { topTracks } from './topTracks/topTracks';
import { getMusicPlaylist } from './actions';
import { errorMessage } from '../error/actions';

function* getPlaylistUser({ userID }) {
  console.log(userID, 'user Firebase sagas');
  try {
    const playlist = topTracks;
    yield put(getMusicPlaylist(playlist));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasMusicPlayer() {
  yield takeEvery(ADD_USER, getPlaylistUser);
}

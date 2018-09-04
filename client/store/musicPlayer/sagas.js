import {
  call, put, takeEvery,
  fork
} from 'redux-saga/effects';
import { ADD_USER } from '../user';

function* getPlaylistUser() {
  console.log('success');
}

export function* sagasMusicPlayer() {
  yield takeEvery(ADD_USER, getPlaylistUser);
}

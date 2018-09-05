import { fork } from 'redux-saga/effects';

import { sagasMusicPlayer as musicPlayer } from './musicPlayer/sagas';

export function* rootSagas() {
  yield fork(musicPlayer);
}
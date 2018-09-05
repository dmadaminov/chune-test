import { fork } from 'redux-saga/effects';

import { sagasMusicPlayer as musicPlayer } from './musicPlayer/sagas';
import { sagasSpotify as spotify } from './spotify/sagas';

export function* rootSagas() {
  yield fork(musicPlayer);
  yield fork(spotify);
}
import { fork } from 'redux-saga/effects';

import { sagasMusicPlayer as musicPlayer } from './musicPlayer/sagas';
import { sagasSpotify as spotify } from './spotify/sagas';
import { sagasAuthUser as auth } from './auth/sagas';
import { sagasArtists as artists } from './artists/sagas';

export function* rootSagas() {
  yield fork(musicPlayer);
  yield fork(spotify);
  yield fork(auth);
  yield fork(artists);
}

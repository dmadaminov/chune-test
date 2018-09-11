import { fork } from 'redux-saga/effects';

import { sagasMusicPlayer as musicPlayer } from './musicPlayer/sagas';
import { sagasSpotify as spotify } from './spotify/sagas';
import { sagasAuthUserBasic as authBasic } from './auth/basic/sagas';
import { sagasAuthUserSocial as authSocial } from './auth/social/sagas';

export function* rootSagas() {
  yield fork(musicPlayer);
  yield fork(spotify);
  yield fork(authBasic);
  yield fork(authSocial);
}

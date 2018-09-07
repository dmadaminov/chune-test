import { put, takeEvery, call } from 'redux-saga/effects';
import { getUserProfileSpotify } from '../../utilities/spotify-auth';
import { GET_ACCESS_TOKEN_SPOTIFY } from './types';
import { successGetUserProfileSpotify } from './actions';
import { errorMessage } from '../error/actions';

export function* getUserProfile({ payload }) {
  const { token } = payload;
  try {
    const profile = yield call(getUserProfileSpotify, token);
    yield put(successGetUserProfileSpotify(profile.data));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasSpotify() {
  yield takeEvery(GET_ACCESS_TOKEN_SPOTIFY, getUserProfile);
}
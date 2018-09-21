import {
  put, takeEvery, call,
  fork
} from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { GET_EVENTS_ARTIST } from './types';
import { errorMessage } from '../error/actions';
import { getEventsToServer, getPositionUser } from './utilities/events';
import { successGetEventsArtist, successGetPositionUser } from './actions';

export function* getGeolocation() {
  try {
    const geolocation = yield call(getPositionUser);
    yield put(successGetPositionUser(geolocation));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}
export function* getEvent({ payload }) {
  const {
    id, startDate, endDate,
    name
  } = payload;
  try {
    const events = yield call(getEventsToServer, id, startDate, endDate);
    yield put(successGetEventsArtist(events));
    yield put(push(`/event/${name}`));
  } catch (e) {
    yield put(errorMessage(e.message));
  }
}

export function* sagasEvents() {
  yield fork(getGeolocation);
  yield takeEvery(GET_EVENTS_ARTIST, getEvent);
}

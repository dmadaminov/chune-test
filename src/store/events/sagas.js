import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { GET_EVENTS_ARTIST } from './types';
import { errorMessage } from '../error/actions';
import { getEventsToServer } from './utilities/events';
import { successGetEventsArtist } from './actions';


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
  yield takeEvery(GET_EVENTS_ARTIST, getEvent);
}

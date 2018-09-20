import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  id: null,
  startDate: null,
  endDate: null,
  name: '',
  events: []
};

const getEventsArtist = (
  state, {
    id,
    startDate,
    endDate,
    name
  }
) => ({
  ...state,
  id,
  startDate,
  endDate,
  name
});
const successGetEventsArtist = (state, { events }) => ({ ...state, events });


const handlers = {
  [TYPES.GET_EVENTS_ARTIST]: getEventsArtist,
  [TYPES.SUCCESS_GET_EVENTS_ARTIST]: successGetEventsArtist
};

export const reducerEvents = createReducer(initState, handlers);

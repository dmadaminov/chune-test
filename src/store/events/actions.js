import { GET_EVENTS_ARTIST, SUCCESS_GET_EVENTS_ARTIST } from './types';

export const getEventsArtist = (id, startDate, endDate, name) => ({
  type: GET_EVENTS_ARTIST,
  payload: {
    id,
    startDate,
    endDate,
    name
  }
});
export const successGetEventsArtist = events => ({
  type: SUCCESS_GET_EVENTS_ARTIST,
  payload: { events }
});

import axios from 'axios'

const ADD_EVENTS = "ADD_EVENTS"
const ADD_SINGLE_EVENT = "ADD_SINGLE_EVENT"
const CLEAR_EVENTS = "CLEAR_EVENTS"

export const addEvents = events => ({
    type: ADD_EVENTS,
    events
})
export const addSingleEvent = event => ({
    type: ADD_SINGLE_EVENT,
    event
})

export const clearEvents = () => ({
    type: CLEAR_EVENTS,
})


export const fetchEventsForSingleArtist = name => dispatch => {
  var artistRes = null;
  return axios.post('/events', { name })
      .then(res => {
        var eventData = res.data.data;
        dispatch(addSingleEvent(eventData))
      })
};

export const fetchEventsForMultipleArtists = names => dispatch => {
  return axios.post('/events/multiple', { names: names.join(',') })
      .then(res => {
        var events = res.data.data;
        dispatch(addEvents(events))
      })
}

function eventReducer(events = [], action) {
    switch (action.type) {
        case ADD_EVENTS:
            return [...events, action.events]
        case ADD_SINGLE_EVENT:
          return [...events, action.event]
        case CLEAR_EVENTS:
            return []
        default:
            return events
    }
}

export default eventReducer
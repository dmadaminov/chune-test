import axios from 'axios'

const ADD_EVENTS = "ADD_EVENTS"
const ADD_SINGLE_EVENT = "ADD_SINGLE_EVENT"
const CLEAR_EVENTS = "CLEAR_EVENTS"
const LOADING_EVENTS = "LOADING_EVENTS"

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

export const loadingEvents = () => ({
    type: LOADING_EVENTS,
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
      });
}

const initialState = {
  events: [],
  initialLoading: true,
}

function eventReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_EVENTS:
            return {...state, events: [...state.events, ...action.events], initialLoading: false}
        case ADD_SINGLE_EVENT:
          return { ...state, events: [...state.events, action.event], initialLoading: false}
        case CLEAR_EVENTS:
          return {...state, events: []}
        case LOADING_EVENTS:
            return {...state, initialLoading: true}
        default:
            return state
    }
}

export default eventReducer
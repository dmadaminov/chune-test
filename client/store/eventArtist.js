import axios from 'axios'

const ADD_EVENT_ARTIST = "ADD_EVENT_ARTIST"
const ADD_EVENTS_FOR_ARTIST = "ADD_EVENTS_FOR_ARTIST"
const FETCHING_EVENTS_FOR_ARTIST = "FETCHING_EVENTS_FOR_ARTIST"
const CLEAR_EVENTS_FOR_ARTIST = "CLEAR_EVENTS_FOR_ARTIST"

export const addEventArtist = artist => ({
    type: ADD_EVENT_ARTIST,
    artist
})

export const addEventsForArtist = events => ({
    type: ADD_EVENTS_FOR_ARTIST,
    events
})

export const fetchingEventsForArtist = events => ({
    type: FETCHING_EVENTS_FOR_ARTIST,
})

export const clearEventsForArtist = () => ({
    type: CLEAR_EVENTS_FOR_ARTIST,
})



export const fetchEventsForArtist = name => dispatch => {
  var artistRes = null;
  dispatch(fetchingEventsForArtist());
  return axios.post('/events', { name })
      .then(res => {
        var eventData = res.data.data;
        dispatch(addEventsForArtist(eventData))
      })
};


export const fetchEventArtist = name => dispatch => {
  var artistRes = null;
  return axios.post('/music', { name })
          .then(res => {
            dispatch(clearEventsForArtist(res.data))
            return dispatch(addEventArtist(res.data))
          })
};

const initialState = {
  artist: null,
  events: [],
  fetching: true,
}

function artistWithEventReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_EVENT_ARTIST:
        return {...state, artist: action.artist}
      case ADD_EVENTS_FOR_ARTIST:
        return { ...state, events: [action.events], fetching: false }
      case FETCHING_EVENTS_FOR_ARTIST:
        return { ...state, fetching: true }
      case CLEAR_EVENTS_FOR_ARTIST:
        return {...state, events: []}
      default:
        return state
    }
}

export default artistWithEventReducer
import axios from 'axios'

const ADD_EVENTS = "ADD_EVENTS"
const CLEAR_EVENTS = "CLEAR_EVENTS"

export const addArtistWithEvents = artistsWithEvents => ({
    type: ADD_EVENTS,
    artistsWithEvents
})

export const clearEvents = () => ({
    type: CLEAR_EVENTS,
})


export const fetchArtistWithEvents = name => {
  var artistRes = null;
  return axios.post('/music', { name })
      .then(res => {
        artistRes = res;
        return axios.post('/events', { name });
      }).then(eventRes => {
        var d = {...artistRes.data, events: eventRes.data}
        console.log(d);
        return d;
      })
};

export const fetchFollowingArtistsWithEvents = artists => dispatch => (
  Promise.all(artists.map(artist =>  fetchArtistWithEvents(artist)) )
      .then(artists => dispatch(addArtistWithEvents(artists)))
)

function eventReducer(artistsWithEvents = [], action) {
    switch (action.type) {
        case ADD_EVENTS:
            return artistsWithEvents.concat(action.artistsWithEvents)
        case CLEAR_EVENTS:
            return []
        default:
            return artistsWithEvents
    }
}

export default eventReducer
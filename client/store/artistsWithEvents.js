import axios from 'axios'

const ADD_ARTISTS_WITH_EVENTS = "ADD_ARTISTS_WITH_EVENTS"
const CLEAR_EVENTS = "CLEAR_EVENTS"

export const addArtistsWithEvents = artistsWithEvents => ({
    type: ADD_ARTISTS_WITH_EVENTS,
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
      .then(artists => dispatch(addArtistsWithEvents(artists)))
)

function eventReducer(artistsWithEvents = [], action) {
    switch (action.type) {
        case ADD_ARTISTS_WITH_EVENTS:
            return action.artistsWithEvents
        case CLEAR_EVENTS:
            return []
        default:
            return artistsWithEvents
    }
}

export default eventReducer
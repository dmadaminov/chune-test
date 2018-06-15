import axios from 'axios'

const ADD_ARTIST_WITH_EVENTS = "ADD_ARTIST_WITH_EVENTS"

export const addArtistWithEvents = artist => ({
    type: ADD_ARTIST_WITH_EVENTS,
    artist
})

export const fetchArtistWithEvents = name => dispatch => {
  var artistRes = null;
  return axios.post('/music', { name })
      .then(res => {
        artistRes = res;
        return axios.post('/events', { name });
      }).then(eventRes => {
        var artist = {...artistRes.data, events: eventRes.data}
        dispatch(addArtistWithEvents(artist))
      })
};

function artistWithEventReducer(artist = null, action) {
    switch (action.type) {
        case ADD_ARTIST_WITH_EVENTS:
            return {...action.artist}
        default:
            return artist
    }
}

export default artistWithEventReducer
import axios from 'axios'

const ADD_FOLLOWING_ARTISTS = "ADD_FOLLOWING_ARTISTS"

export const addFollowingArtists = followingArtists => ({
    type: ADD_FOLLOWING_ARTISTS,
    followingArtists
})

export const fetchFollowingArtists = artists => (dispatch, getState) => {
  if(artists.length == 0 ) {
    dispatch(addFollowingArtists([]));
  }
  return axios.post('/artists', { names: artists.join(',') })
    .then(res => {
      return dispatch(addFollowingArtists(res.data))
    })
}

export const fetchArtistInfo = name => (
    axios.post('/music', { name })
         .then(res => res.data)
         .catch(err => null)

)

export const fetchFollowingArtistsWithEvents = names => (dispatch, getState) => {
  console.log("ffav", dispatch, getState());
  return axios.post('/events/multiple', { names: names.join(',') })
      .then(res => dispatch(addFollowingArtists(res.data)))
}

const initialState = {
  artists: [],
  initialLoading: true,
}


function followingArtistsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FOLLOWING_ARTISTS:
          return { ...state, artists: [...action.followingArtists], initialLoading: false}
        default:
          return state
    }
}

export default followingArtistsReducer
import axios from 'axios'
import { database } from '../firebase'

const ADD_FOLLOWING_ARTISTS = "ADD_FOLLOWING_ARTISTS"
const FOLLOW_ARTIST = "FOLLOW_ARTIST"
const UNFOLLOW_ARTIST = "UNFOLLOW_ARTIST"
// const APPEND_ARTIST = "FOLLOW_ARTIST"
// const REMOVE_ARTIST = "UNFOLLOW_ARTIST"

export const appendArtist = (artist) => ({
  type: FOLLOW_ARTIST,
  artist,
})

export const removeArtist = (artist) => ({
  type: UNFOLLOW_ARTIST,
  artist,
})

export const unfollowArtist = (artist, userId) => dispatch => {
  const name = artist.name;
  const ref = database.ref(`users/${userId}/artists`)
  ref.child(name).remove()
  return fetchArtistInfo(name).then(artist => {
    return dispatch(removeArtist(artist))
  })
}

export const followArtist = (artist, userId) => dispatch => {
  var name = artist.name;
  const ref = database.ref(`users/${userId}/artists`)
  ref.update({[name]: true});
  return fetchArtistInfo(name).then(artist => {
    return dispatch(appendArtist(artist))
  })
}


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
        case FOLLOW_ARTIST:
          return {...state, artists: state.artists.concat([action.artist])}
        case UNFOLLOW_ARTIST:
          return {...state, artists: state.artists.filter(artist => action.artist.artistId !== artist.artistId)}
        default:
          return state
    }
}

export default followingArtistsReducer
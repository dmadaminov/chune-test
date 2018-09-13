const FOLLOW_USER_ARTIST = "ADD_USER_ARTIST"
const FOLLOW_USER_ARTIST = "ADD_USER_ARTIST"
const UNFOLLOW_USER_ARTIST = "GET_USER_ARTISTS"
const UNFOLLOW_USER_ARTIST = "GET_USER_ARTISTS"
const FETCH_USER_ARTISTS = "GET_USER_ARTISTS"

export const followArtist = (userId, artist) => dispatch => ({
  type: FOLLOW_USER_ARTIST,
  userId,
  artist,
})
export const unFollowArtist = (userId, artist) => ({
  type: UNFOLLOW_USER_ARTIST,
  userId,
  artist,
})

export const logOut = () => ({
  type: LOG_OUT,
})

function userArtistsReducer(userArtists=[], action){
  switch(action.type){
    case GET_USER_ARTISTS:
      return action.userID
    case FOLLOW_USER_ARTIST:
      return ''
    case UNFOLLOW_USER_ARTIST:
      return 
    default:
      return userArtists
  }
}

export default userReducer
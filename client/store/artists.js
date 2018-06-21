import { fetchFollowingArtists } from './followingArtists'


const ADD_ARTISTS = "ADD_ARTISTS"
const DELETE_ARTIST = "DELETE_ARTIST"

export const deleteArtist = artist => ({
    type: DELETE_ARTIST,
    artist
})

export const addArtistsToList = artists => ({
    type: ADD_ARTISTS,
    artists
})

export const addArtists = artists => dispatch => {
  dispatch(addArtistsToList(artists));
}

function artistsReducer(artists = [], action) {
    switch (action.type) {
        case ADD_ARTISTS:
            return [...action.artists]
        case DELETE_ARTIST:
            return artists.filter(artist=> artist != action.artist)
        default:
            return artists
    }
}

export default artistsReducer
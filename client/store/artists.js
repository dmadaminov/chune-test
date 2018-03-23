const ADD_ARTISTS = "ADD_ARTISTS"
const DELETE_ARTIST = "DELETE_ARTIST"

export const deleteArtist = artist => ({
    type: DELETE_ARTIST,
    artist
})

export const addArtists = artists => ({
    type: ADD_ARTISTS,
    artists
})

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
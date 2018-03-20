const ADD_ARTISTS = "ADD_ARTISTS"

export const addArtists = artists => ({
    type: ADD_ARTISTS,
    artists
})

function artistsReducer(artists = [], action) {
    switch (action.type) {
        case ADD_ARTISTS:
            if (artists.toString() !== action.artists.toString()) return [...action.artists]
        default:
            return artists
    }
}

export default artistsReducer
import axios from 'axios'

const ADD_FOLLOWING_ARTISTS = "ADD_FOLLOWING_ARTISTS"

export const addFollowingArtists = followingArtists => ({
    type: ADD_FOLLOWING_ARTISTS,
    followingArtists
})

export const fetchFollowingArtists = artists => dispatch => (
    Promise.all(artists.map(artist =>  fetchArtistInfo(artist)) )
        .then(artists => dispatch(addFollowingArtists(artists.filter(artist => !!artist))))
)

export const fetchArtistInfo = name => (
    axios.post('/music', { name })
         .then(res => res.data)
         .catch(err => null)

)

function followingArtistsReducer(followingArtists = [], action) {
    switch (action.type) {
        case ADD_FOLLOWING_ARTISTS:
            return [...action.followingArtists]
        default:
            return followingArtists
    }
}

export default followingArtistsReducer
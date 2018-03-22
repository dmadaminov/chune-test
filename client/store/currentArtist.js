import axios from 'axios'

const ADD_ARTIST = "ADD_ARTIST"

const addArtist = artist => ({
    type: ADD_ARTIST,
    artist
})

export const fetchArtist = name => dispatch => (
    axios.post('/music', { name })
        .then(res => dispatch(addArtist(res.data)))
)

function currentReducer (current="", action){
    switch (action.type){
        case ADD_ARTIST:
            return action.artist
        default:
            return current
    }
}

export default currentReducer
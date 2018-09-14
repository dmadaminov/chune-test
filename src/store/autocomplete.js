import axios from 'axios'

const AUTOCOMPLETE_ARTISTS = "AUTOCOMPLETE_ARTISTS"
const CLEAR = "CLEAR_AUTOCOMPLETIONS"

const autocompleteArtists = autocompletions => ({
    type: AUTOCOMPLETE_ARTISTS,
    autocompletions
})

const clear = _ => ({ type: CLEAR })

export const fetchArtistAutocompletions = name => dispatch => (
    axios.post('/autocomplete', { name })
        .then(res => dispatch(autocompleteArtists(res.data)))
)

export const clearCompletions = _ => dispatch => dispatch(clear())

function artistAutocompletionReducer (current="", action){
    switch (action.type){
        case AUTOCOMPLETE_ARTISTS:
            // console.log(action.autocompletions)
            return action.autocompletions
        case CLEAR:
            return {}
        default:
            return current
    }
}

export default artistAutocompletionReducer
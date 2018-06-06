import axios from 'axios'

const ADD_EVENTS = "ADD_EVENTS"
const CLEAR_EVENTS = "CLEAR_EVENTS"

export const addEvents = events => ({
    type: ADD_EVENTS,
    events
})

export const clearEvents = () => ({
    type: CLEAR_EVENTS,
})

export const fetchEvents = name => dispatch => (
    axios.post('/events', { name })
        .then(res => res.data)
        .then(events => dispatch(addEvents(events)))
)

function eventReducer(articles = [], action) {
    switch (action.type) {
        case ADD_EVENTS:
            return articles.concat(action.events)
        case CLEAR_EVENTS:
            return []
        default:
            return articles
    }
}

export default eventReducer
import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import artists from './artists'
import articles from './articles'
import recentEntries from './recentEntries'
import videos from './videos'
import currentArtist from './currentArtist'
import currentVideo from './currentVideo'
import artistAutocompletions from './autocomplete'
import artistAutosuggestions from './auto-suggestions'
import followingArtists from './followingArtists'
import events from './events'

const reducer = combineReducers({
    user,
    artists,
    articles,
    recentEntries,
    videos,
    currentArtist,
    currentVideo,
    artistAutocompletions,
    artistAutosuggestions,
    followingArtists,
    events
})
const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store

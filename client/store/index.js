import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import artists from './artists'
import articles from './articles'
import videos from './videos'
import currentArtist from './currentArtist'
import currentVideo from './currentVideo'

const reducer = combineReducers({
  user,
  artists,
  articles,
  videos,
  currentArtist,
  currentVideo,
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
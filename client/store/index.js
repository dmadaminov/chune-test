import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { reducer as geolocation } from 'react-redux-geolocation';
import { composeWithDevTools } from 'redux-devtools-extension';

import user from './user';
import artists from './artists';
import articles from './articles';
import recentEntries from './recentEntries';
import videos from './videos';
import currentArtist from './currentArtist';
import artistAutocompletions from './autocomplete';
import artistAutosuggestions from './auto-suggestions';
import followingArtists from './followingArtists';
import events from './events';
import eventArtist from './eventArtist';
import { REDUCERMUSICPLAYER } from './musicPlayer/reducer';
import { REDUCERERROR } from './error/reducer';
import { rootSagas } from './sagas';
import { REDUCERSPOTIFY } from './spotify/reducer';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    user,
    artists,
    articles,
    recentEntries,
    videos,
    currentArtist,
    artistAutocompletions,
    artistAutosuggestions,
    followingArtists,
    events,
    eventArtist,
    geolocation,
    dataMusicPlayer: REDUCERMUSICPLAYER,
    error: REDUCERERROR,
    dataSpotify: REDUCERSPOTIFY
});

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    sagaMiddleware,
    createLogger({collapsed: true})
));

const store = createStore(reducer, middleware);

sagaMiddleware.run(rootSagas);

export default store;

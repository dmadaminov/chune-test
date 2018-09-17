import {
  createStore, combineReducers, applyMiddleware,
  compose
} from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { reducer as geolocation } from 'react-redux-geolocation';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import user from './user';
import artists from './artists';
import articles from './articles';
import recentEntries from './recentEntries';
import videos from './videos';
import currentArtist from './currentArtist';
import artistAutocompletions from './autocomplete';
import artistAutosuggestions from './auto-suggestions';
// import followingArtists from './followingArtists';
import events from './events';
import eventArtist from './eventArtist';
import { rootSagas } from './sagas';
import { reducerMusicPlayer } from './musicPlayer/reducer';
import { reducerError } from './error/reducer';
import { reducerSpotify } from './spotify/reducer';
import { reducerAuthUser } from './auth/reducer';
import { reducerArtists } from './artists/reducer';
import { reducerSearch } from './autosuggest/reducer';

export const history = createBrowserHistory();
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
  //  followingArtists,
  events,
  eventArtist,
  geolocation,
  dataMusicPlayer: reducerMusicPlayer,
  error: reducerError,
  dataSpotify: reducerSpotify,
  dataAuth: reducerAuthUser,
  dataArtists: reducerArtists,
  dataSearch: reducerSearch
});

const userPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['dataAuth', 'dataSpotify', 'dataArtists']
};

const persistedReducer = persistReducer(userPersistConfig, reducer);

const middleware = composeWithDevTools(
  compose(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      createLogger({ collapsed: true })
    )
  )
);

export const store = createStore(
  connectRouter(history)(persistedReducer),
  middleware
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);

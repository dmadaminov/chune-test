import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { reducer as geolocation } from 'react-redux-geolocation';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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
import { rootSagas } from './sagas';
import { reducerMusicPlayer } from './musicPlayer/reducer';
import { reducerError } from './error/reducer';
import { reducerSpotify } from './spotify/reducer';
import { reducerAuthUser } from './auth/reducer';
import { reducerArtists } from './artists/reducer';

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
  dataMusicPlayer: reducerMusicPlayer,
  error: reducerError,
  dataSpotify: reducerSpotify,
  dataAuth: reducerAuthUser,
  dataArtists: reducerArtists
});

const userPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['dataAuth', 'dataSpotify']
};

const persistedReducer = persistReducer(userPersistConfig, reducer);

const middleware = composeWithDevTools(applyMiddleware(
  sagaMiddleware,
  createLogger({ collapsed: true })
));

export const store = createStore(persistedReducer, middleware);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);

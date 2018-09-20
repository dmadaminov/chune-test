import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  value: '',
  suggestions: []
};

const searchArtists = (state, { value }) => ({ ...state, value });
const successSearchArtists = (state, { suggestions }) => ({ ...state, suggestions });
const clearListSearch = state => ({ ...state, suggestions: [] });

const handlers = {
  [TYPES.SEARCH_ARTISTS]: searchArtists,
  [TYPES.SUCCESS_SEARCH_ARTISTS]: successSearchArtists,
  [TYPES.CLEAR_LIST_SEARCH]: clearListSearch
};

export const reducerSearch = createReducer(initState, handlers);

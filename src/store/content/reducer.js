import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

export const initState = {
  content: {}
};

const getContentHomepage = state => ({ ...state });
const successGetContentHomepage = (state, { content }) => ({ ...state, content });

const handlers = {
  [TYPES.GET_CONTENT_HOMEPAGE]: getContentHomepage,
  [TYPES.SUCCESS_GET_CONTENT_HOMEPAGE]: successGetContentHomepage
};

export const reducerContent = createReducer(initState, handlers);

import { createReducer } from '../../utilities/utility';
import * as TYPES from './types';

const initState = {
  message: ''
};

const errorMessage = (state, { message }) => ({ ...state, message });

const handlers = {
  [TYPES.ERROR_MESSAGE]: errorMessage
};

export const reducerError = createReducer(initState, handlers);
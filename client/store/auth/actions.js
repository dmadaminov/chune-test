import {
  CREATE_NEW_USER, LOGIN_USER, SUCCESS_GET_TOKEN,
  SUCCESS_GET_PROFILE_SOCIAL
} from './types';

export const createNewUser = (email, password) => ({
  type: CREATE_NEW_USER,
  payload: { email, password }
});

export const loginUser = (email, password) => ({
  type: LOGIN_USER,
  payload: { email, password }
});

export const successGetToken = token => ({
  type: SUCCESS_GET_TOKEN,
  payload: { token }
});

export const successGetProfileSocial = profile => ({
  type: SUCCESS_GET_PROFILE_SOCIAL,
  payload: { profile }
});

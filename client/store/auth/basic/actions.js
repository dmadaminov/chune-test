import {
  CREATE_NEW_USER_BASIC, SUCCESS_CREATE_NEW_USER_BASIC
} from './types';

export const createNewUserBasic = (email, password) => ({
  type: CREATE_NEW_USER_BASIC,
  payload: { email, password }
});

export const successCreateNewUserBasic = token => ({
  type: SUCCESS_CREATE_NEW_USER_BASIC,
  payload: { token }
});

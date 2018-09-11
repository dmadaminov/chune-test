import { SUCCESS_GET_TOKEN_SOCIAL, SUCCESS_GET_PROFILE_SOCIAL } from './types';

export const successGetTokenSocial = token => ({
  type: SUCCESS_GET_TOKEN_SOCIAL,
  payload: { token }
});

export const successGetProfileSocial = profile => ({
  type: SUCCESS_GET_PROFILE_SOCIAL,
  payload: { profile }
});

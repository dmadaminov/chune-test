import { reducerAuthUser as reducer, initState } from '../../../src/store/auth/reducer';
import * as TYPES from '../../../src/store/auth/types';

describe('Auth reducer', () => {
  it('should success get token', () => {
    const token = 'token';
    const action = { type: TYPES.SUCCESS_GET_TOKEN, payload: { token } };
    const nextState = reducer(initState, action);

    expect(nextState).toEqual({ ...initState, token });
  });
  it('should success get social profile', () => {
    const profile = [{ name: 'Drake', age: 23 }];
    const action = { type: TYPES.SUCCESS_GET_PROFILE_SOCIAL, payload: { profile } };
    const nextState = reducer(initState, action);

    expect(nextState).toEqual({ ...initState, profile });
  });
  it('should log out', () => {
    const action = { type: TYPES.LOG_OUT_USER };
    const nextState = reducer(initState, action);
    const token = '';
    const profile = {};

    expect(nextState).toEqual({ ...initState, token, profile });
  });
});

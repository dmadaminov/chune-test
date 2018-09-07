import { reducerError as reducer, initState } from '../../../client/store/error/reducer';
import * as TYPES from '../../../client/store/error/types';

describe('Error reducer', () => {
  it('should error message', () => {
    const message = 'error';
    const action = { type: TYPES.ERROR_MESSAGE, payload: { message } };
    const nextState = reducer(initState, action);

    expect(nextState).toEqual({ ...initState, message });
  });
});
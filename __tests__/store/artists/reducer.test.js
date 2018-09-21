import { reducerArtists as reducer, initState } from '../../../src/store/artists/reducer';
import * as TYPES from '../../../src/store/artists/types';

describe('Artists reducer', () => {
  it('should success get artists list', () => {
    const artists = [{ name: 'Drake', genre: 'POP' }, { name: 'Shakira', genre: 'POP' }];
    const recommended = [{ name: 'Drake', genre: 'POP' }, { name: 'Shakira', genre: 'POP' }];
    const action = { type: TYPES.SUCCESS_GET_USER_ARTISTS, payload: { artists, recommended } };
    const nextState = reducer(initState, action);

    expect(nextState).toEqual({ ...initState, artists, recommended });
  });
});

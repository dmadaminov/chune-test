import { REDUCERMUSICPLAYER as reducer, initState } from '../../../client/store/musicPlayer/reducer';
import * as TYPES from '../../../client/store/musicPlayer/types';

describe('Music player reducer', () => {
  it('should close music player', () => {
    const action = { type: TYPES.CLOSE_MUSIC_PLAYER };
    const nextState = reducer(initState, action);

    expect(nextState).toEqual({ ...initState, modal: false });
  });

  it('should get playlist', () => {
    const playlist = [{ id: 219, title: 'The Greatest' }, { id: 398, title: 'From the heart' }];
    const action = { type: TYPES.GET_MUSIC_PLAYLIST, payload: { playlist }};
    const nextState = reducer(initState, action);

    expect(nextState).toEqual({ ...initState, playlist });
  });
});

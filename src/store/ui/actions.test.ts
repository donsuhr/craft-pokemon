import { setTextFilter } from './actions';
import { UiActionTypes } from './types';

describe('UI actions', () => {
  it('Set text filter', () => {
    const expectedAction = {
      type: UiActionTypes.SET_FILTER_TEXT,
      payload: '1',
    };
    expect(setTextFilter('1')).toMatchObject(expectedAction);
  });
});

import { setTextFilter, setViewAll } from './actions';
import { UiActionTypes } from './types';

describe('UI actions', () => {
  it('Set view All', () => {
    const expectedAction = {
      type: UiActionTypes.SET_VIEW_ALL,
      payload: true,
    };
    expect(setViewAll(true)).toMatchObject(expectedAction);
  });

  it('Set text filter', () => {
    const expectedAction = {
      type: UiActionTypes.SET_FILTER_TEXT,
      payload: '1',
    };
    expect(setTextFilter('1')).toMatchObject(expectedAction);
  });
});

import { ui } from './reducers';
import { UiActionTypes } from './types';

describe('Ui Reducer', () => {
  it('should set viewAll', () => {
    expect(
      ui(undefined, {
        type: UiActionTypes.SET_VIEW_ALL,
        payload: false,
      }),
    ).toMatchObject({
      viewAll: false,
      filterText: '',
    });
  });
  it('should set filterText', () => {
    expect(
      ui(undefined, {
        type: UiActionTypes.SET_FILTER_TEXT,
        payload: 'hello',
      }),
    ).toMatchObject({
      filterText: 'hello',
    });
  });
});

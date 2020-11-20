import { ui } from './reducers';
import { UiActionTypes } from './types';

describe('Ui Reducer', () => {
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

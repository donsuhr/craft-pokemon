
import { UiActionTypes } from './types';

const initialState = {
  viewAll: true,
  filterText: '',
}

export const ui = (state = initialState, action) => {
  switch (action.type) {
    case UiActionTypes.SET_VIEW_ALL:
      return { ...state, viewAll: action.payload };
    case UiActionTypes.SET_FILTER_TEXT:
      return { ...state, filterText: action.payload };
    default:
      return state;
  }
};

export type UiState = ReturnType<typeof ui>;


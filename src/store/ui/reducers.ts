import { UiActionTypes } from './types';
import { ActionTypes } from './actions';

const initialState = {
  viewAll: true,
  filterText: '',
};

export const ui = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case UiActionTypes.SET_FILTER_TEXT:
      return { ...state, filterText: action.payload };
    default:
      return state;
  }
};

export type UiState = ReturnType<typeof ui>;

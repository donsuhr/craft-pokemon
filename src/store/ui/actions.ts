import { action } from 'typesafe-actions';
import { UiActionTypes } from './types';

export const setTextFilter = (val: string) =>
  action(UiActionTypes.SET_FILTER_TEXT, val);

type SetTextFilterActionType = ReturnType<typeof setTextFilter>;

export type ActionTypes = SetTextFilterActionType;


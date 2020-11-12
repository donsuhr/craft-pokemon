import { action } from 'typesafe-actions';
import { UiActionTypes } from './types';

export const setViewAll = (val:boolean) => action(UiActionTypes.SET_VIEW_ALL, val);
export const setTextFilter = (val: string) =>
  action(UiActionTypes.SET_FILTER_TEXT, val);

type SetViewAllActionType = ReturnType<typeof setViewAll>;
type SetTextFilterActionType = ReturnType<typeof setTextFilter>;

export type ActionTypes = SetViewAllActionType | SetTextFilterActionType;


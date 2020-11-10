import { action } from 'typesafe-actions';
import { UiActionTypes } from './types';

export const setViewAll = (val) => action(UiActionTypes.SET_VIEW_ALL, val);
export const setTextFilter = (val: any) =>
  action(UiActionTypes.SET_FILTER_TEXT, val);

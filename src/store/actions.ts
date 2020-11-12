import { action } from 'typesafe-actions';
import { RootActionTypes } from './types';

export const storeInitted = () => action(RootActionTypes.INIT);

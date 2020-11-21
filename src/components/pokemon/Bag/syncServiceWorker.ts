import { Middleware } from 'redux';
import { getBagState } from '@/store/selectors';
import { RootActionTypes } from '@/store/types';
import { PokemonBagActionTypes } from './types';
import { getBagItems } from './reducers';

const syncServiceWorkerMiddleware: Middleware = (store) => (next) => (
  action,
) => {
  if (
    action.type === RootActionTypes.INIT ||
    action.type === PokemonBagActionTypes.ADD ||
    action.type === PokemonBagActionTypes.REMOVE
  ) {
    next(action);
    const bagState = getBagState(store.getState());
    const inBag = getBagItems(bagState);

    navigator.serviceWorker.ready.then(() => {
      navigator?.serviceWorker?.controller?.postMessage({
        type: 'bagUpdated',
        payload: inBag,
      });
    });
  } else {
    next(action);
  }
};

export default syncServiceWorkerMiddleware;

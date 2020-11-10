import { Middleware } from 'redux';
import { PokemonBagActionTypes } from './types';
import { getBagItems } from './reducers';
import { getBagState } from '../../../redux/reducers';
import { RootActionTypes } from '../../../redux/types';

const syncServiceWorkerMiddleware: Middleware = (store) => (next) => (
  action,
) => {
  if (
    action.type === RootActionTypes.INIT ||
    action.type === PokemonBagActionTypes.ADD ||
    action.type === PokemonBagActionTypes.REMOVE
  ) {
    const bagState = getBagState(store.getState());
    const inBag = getBagItems(bagState);

    navigator.serviceWorker.ready.then(() => {
      navigator?.serviceWorker?.controller?.postMessage({
        type: 'bagUpdated',
        payload: inBag,
      });
    });
  }
  return next(action);
};

export default syncServiceWorkerMiddleware;

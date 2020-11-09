import { PokemonBagActionTypes } from "./types";
import { getBagItems } from "./reducers";
import { getBagState } from '../../../reducers';
import { RootActionTypes } from '../../../types';

const syncServiceWorkerMiddleware = (store) => (next) => (action) => {
  if (
    action.type === RootActionTypes.INIT ||
    action.type === PokemonBagActionTypes.ADD ||
    action.type === PokemonBagActionTypes.REMOVE
  ) {
    const bagState = getBagState(store.getState());
    const inBag = getBagItems(bagState);

    navigator.serviceWorker.ready.then(() => {
      navigator.serviceWorker.controller.postMessage({
        type: 'bagUpdated',
        payload: inBag,
      });
    });
  }
  return next(action);
};

export default syncServiceWorkerMiddleware;

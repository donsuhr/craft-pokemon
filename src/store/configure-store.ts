import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
// @ts-ignore
import persistState from 'redux-localstorage';
import { rootReducer } from './root-reducer';
import { ApplicationState } from './types';
import syncServiceWorker from '../components/pokemon/Bag/syncServiceWorker';

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, syncServiceWorker),
  persistState('pokemonBag', { key: 'pokemonBag' }),
);

export default function configureStore(initialState?: ApplicationState) {
  return createStore(rootReducer, initialState, enhancer);
}

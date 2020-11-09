import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import { ApplicationState, rootReducer } from './reducers';

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  persistState('pokemonBag', { key: 'pokemonBag' }),
);

export default function configureStore(initialState?: ApplicationState) {
  return createStore(rootReducer, initialState, enhancer);
}

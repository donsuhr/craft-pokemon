import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import { ApplicationState, rootReducer } from './reducers';

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  persistState('pokemonBag', { key: 'pokemonBag' }),
);

export default function configureStore(initialState?: ApplicationState) {
  return createStore(rootReducer, initialState, enhancer);
}

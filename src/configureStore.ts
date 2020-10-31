import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { ApplicationState, rootReducer } from './reducers';

export default function configureStore(initialState?: ApplicationState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
}

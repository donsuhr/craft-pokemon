import React from 'react';
import ReactDOM from 'react-dom';
import 'timers-browserify';
import { storeInitted } from '@/store/actions';
import configureStore from '@/store/configure-store';
import App from './App';
import './styles/main.scss';

const store = configureStore();
store.dispatch(storeInitted());
export type AppDispatch = typeof store.dispatch;

ReactDOM.render(<App store={store} />, document.getElementById('App'));

if (
  process.env.NODE_ENV === 'production' ||
  process.env.DEV_USE_SW_FOR_RUNTIME === 'true' ||
  process.env.DEV_USE_SW_FOR_API === 'true'
) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
}

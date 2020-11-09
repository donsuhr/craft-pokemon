import React from 'react';
import ReactDOM from 'react-dom';
import 'timers-browserify';
import App from './App';
import './styles/main.scss';

import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('App'));

export type AppDispatch = typeof store.dispatch;
if (
  process.env.NODE_ENV === 'production' ||
  process.env.DEV_USE_SW_FOR_RUNTIME === 'true' ||
  process.env.DEV_USE_SW_FOR_API === 'true'
) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
}


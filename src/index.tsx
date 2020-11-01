import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import 'timers-browserify';
import App from './App';
import './styles/main.scss';

import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(<App store={store} />, document.getElementById('App'));

export type AppDispatch = typeof store.dispatch;

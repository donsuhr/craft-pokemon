import React from 'react';
import { Store } from 'redux';
// import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Details from './pages/Details';
import { ApplicationState } from './store/types';

export interface AppProps {
  store: Store<ApplicationState>;
}

/* eslint-disable-next-line no-underscore-dangle,@typescript-eslint/naming-convention */
declare const __webpack_public_path__: string;

const App = ({ store }: AppProps) => (
  <Provider store={store}>
    <Router basename={__webpack_public_path__}>
      <Switch>
        <Route path="/detail/:id?">
          <Details />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;

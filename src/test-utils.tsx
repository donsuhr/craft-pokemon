/* istanbul ignore file */

import * as React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './reducers';

function render(
  ui: React.ReactElement,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  }: any = {},
) {
  function Wrapper({ children }: { children: React.ReactElement }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
// override render method
export { render };

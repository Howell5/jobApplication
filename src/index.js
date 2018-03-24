import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './container/Login/login';
// import Register from './container/register/register';

import reducer from './reducer';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolExtension ? window.devToolExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route component={Login} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

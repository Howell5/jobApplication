import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//container
import Login from './container/Login/login';
import Register from './container/Register/register';
import BoosInfo from './container/BossInfo/BoosInfo';
import GeniusInfo from './container/GeniusInfo/GeniusInfo';

//component
import AuthRoute from './component/AuthRoute/AuthRoute';

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
        <AuthRoute />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/boosinfo" component={BoosInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

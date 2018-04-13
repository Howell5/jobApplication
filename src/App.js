import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
//component
import AuthRoute from './component/AuthRoute/AuthRoute';
//container
import Login from './container/Login/login';
import Register from './container/Register/register';
import BossInfo from './container/BossInfo/BossInfo';
import GeniusInfo from './container/GeniusInfo/GeniusInfo';
import Chat from './container/Dashboard/Chat/Chat';
import Dashboard from './container/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;

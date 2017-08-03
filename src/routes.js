import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './containers/App';
import About from './containers/About';
import Callback from 'components/callback/Callback.js';
import NotFound from './containers/NotFound';
import Auth from 'utils/authService/AuthService.js';

const Routes = (props) => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/about" component={About} />
    <Route exact path="/callback" component={Callback} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
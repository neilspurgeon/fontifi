import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { requireAuth } from 'utils/authService/AuthService.js';

import App from './containers/App';
import About from './containers/About';
import Callback from 'components/callback/Callback.js';
import NotFound from './containers/NotFound';

const Routes = (props) => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/about" component={About} onEnter={requireAuth} />
    <Route exact path="/callback" component={Callback} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
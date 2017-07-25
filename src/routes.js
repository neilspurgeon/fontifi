import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './containers/App';
import About from './containers/About';
import NotFound from './containers/NotFound';

const Routes = (props) => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/about" component={About} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
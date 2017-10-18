import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import App from './containers/App';
import About from './containers/About';
import MyCollection from './containers/MyCollection';
import Callback from 'components/callback/Callback.js';
import NotFound from './containers/NotFound';
import AdminPanel from './containers/AdminPanel';
import Auth from 'utils/authService/AuthService';

const auth = new Auth();

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAdminUser() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const Routes = (props) => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/about" component={About} />
    <Route exact path="/collection" component={MyCollection} />
    <Route exact path="/callback" component={Callback} />
    <AdminRoute exact path="/admin" component={AdminPanel} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
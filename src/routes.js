import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import App from './containers/App';
import MyCollection from './containers/MyCollection';
import Callback from 'components/callback/Callback.js';
import NotFound from './containers/NotFound';
import AdminPanel from './containers/AdminPanel';
import Auth from 'utils/authService/AuthService';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-45097231-3');

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
  return null;
};

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
  <div>
    <Route path="/" component={logPageView} />
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/collection" component={MyCollection} />
      <Route exact path="/callback" component={Callback} />
      <AdminRoute exact path="/admin" component={AdminPanel} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
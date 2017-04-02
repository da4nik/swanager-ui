import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'views/App';
import Dashboard from 'views/Dashboard';
import NotFound from 'views/NotFound';
import Signin from 'views/Signin';
import Signup from 'views/Signup';
import EnsureLoggedInContainer from 'components/Global/EnsureLoggedInContainer';

export const ROUTE_SIGN_IN = '/signin';
export const ROUTE_SIGN_UP = '/signup';

export default class Routes extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path='/' component={ App }>

          <Route path={ ROUTE_SIGN_IN } component={ Signin } />
          <Route path={ ROUTE_SIGN_UP } component={ Signup } />

          <Route component={ EnsureLoggedInContainer }>
            <IndexRoute component={ Dashboard } />
          </Route>

          <Route path='*' component={ NotFound } />
        </Route>
      </Router>
    );
  }
}

import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'views/App';
import Dashboard from 'views/Dashboard';
import NotFound from 'views/NotFound';
import Signin from 'views/Signin';
import EnsureLoggedInContainer from 'components/Global/EnsureLoggedInContainer';

export default class Routes extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path='/' component={ App }>

          <Route path='/signin' component={ Signin } />

          <Route component={ EnsureLoggedInContainer }>
            <IndexRoute component={ Dashboard } />
          </Route>

          <Route path='*' component={ NotFound } />
        </Route>
      </Router>
    );
  }
}

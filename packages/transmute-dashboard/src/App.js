import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import config from './app.config';
import Header from './components/Header';
import HomePage from './components/Home';
import RegistrationForm from './components/Registration';
import LoginPage from './components/Login';
import ProfilePage from './components/Profile';
import DebugForm from './components/Debug';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main role="main">
          <div className="container">
            <main>
              <SecureRoute path="/" exact={true} component={HomePage} />
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Route path="/login" render={() => <LoginPage baseUrl={config.url} />} />
              <Route path="/register" component={RegistrationForm} />
              <SecureRoute path="/profile" component={ProfilePage} />
              <SecureRoute path="/debug" component={DebugForm} />
            </main>
          </div>
        </main>
      </div>
    );
  }
}
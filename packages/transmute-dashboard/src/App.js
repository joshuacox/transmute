import React, { Component } from 'react';
import { Route } from 'react-router';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import config from './app.config';
import Header from './Components/Header';
import HomePage from './Components/Home';
import RegistrationForm from './Components/Registration';
import LoginPage from './Components/Login';
import ProfilePage from './Components/Profile';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <main role="main">
          <div className="container">
            <main>
              {/* <SecureRoute path="/" exact={true} component={HomePage} /> */}
              <Route path="/" exact={true} component={HomePage} />
              <Route path="/implicit/callback" component={ImplicitCallback} />
              <Route path="/login" render={() => <LoginPage baseUrl={config.url} />} />
              <Route path="/register" component={RegistrationForm} />
              {/* <SecureRoute path="/profile" component={ProfilePage} /> */}
              <Route path="/profile" component={ProfilePage} />
            </main>
          </div>
        </main>
      </div>
    );
  }
}
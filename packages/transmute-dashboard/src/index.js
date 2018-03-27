import React from 'react';
import ReactDOM from 'react-dom';
import config from './app.config';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { ToastContainer } from 'react-toastify';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Security, Auth } from '@okta/okta-react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { store } from './store';
import theme from './theme';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

injectTapEventPlugin();

const auth = new Auth({
  issuer: config.issuer,
  client_id: config.client_id,
  redirect_uri: config.redirect_uri,
  onAuthRequired: ({ history }) => history.push('/login')
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <div>
          <ToastContainer />
          <Security auth={auth}>
            <App />
          </Security>
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
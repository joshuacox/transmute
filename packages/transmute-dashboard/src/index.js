import React from 'react';
import ReactDOM from 'react-dom';
import config from './app.config';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { ToastContainer } from 'react-toastify';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Security } from '@okta/okta-react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import theme from './theme';
import { createBrowserHistory } from 'history';
// import { store } from './store';
import configureStore from './store';
import { PersistGate } from 'redux-persist/integration/react'

const history = createBrowserHistory();
const { persistor, store } = configureStore();

injectTapEventPlugin();
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <div>
          <ToastContainer />
          <Security 
            issuer={config.issuer}
            client_id={config.client_id}
            redirect_uri={config.redirect_uri}
        >
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Security>
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
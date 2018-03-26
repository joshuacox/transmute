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
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from './store';
import theme from './theme';

injectTapEventPlugin();

const auth = new Auth({
  history,
  issuer: config.issuer,
  client_id: config.client_id,
  redirect_uri: config.redirect_uri,
  onAuthRequired: ({ history }) => history.push('/login')
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <div>
          <ToastContainer />
          <Security auth={auth}>
            <App />
          </Security>
        </div>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
// import AppBar from 'material-ui/AppBar';
// import Button from 'material-ui/Button';
// import IconButton from 'material-ui/IconButton';
// import MenuIcon from 'material-ui-icons/Menu';
// import AccountCircle from 'material-ui-icons/AccountCircle';
// import Menu, { MenuItem } from 'material-ui/Menu';
// import Typography from 'material-ui/Typography';
// import Toolbar from 'material-ui/Toolbar';
// import { withAuth } from '@okta/okta-react';

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { withAuth } from '@okta/okta-react';

// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   flex: {
//     flex: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} href="/login" label="Login" />
    );
  }
}

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem primaryText="Home" href="/" />
    <MenuItem primaryText="Profile" href="/profile" />
    <MenuItem primaryText="Logout" onClick={props.auth.logout} />
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null
    };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  render() {
    const { authenticated } = this.state;

    if (authenticated === null) { this.setState({ authenticated: false })};

    return (
      <div>
        <AppBar
          title="Title"
          iconElementRight={!this.state.authenticated ? <Logged /> : <Login />}
        />
      </div>
    );
  }
}

export default withAuth(Header);

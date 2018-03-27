import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { withAuth } from '@okta/okta-react';

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
    {/* <MenuItem primaryText="Logout" onClick={props.auth.logout} /> */}
  </IconMenu>
);

Logged.muiName = 'IconMenu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
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

    return (
      <div>
        <AppBar
          title="Title"
          iconElementRight={this.state.authenticated ? <Logged /> : <Login />}
        />
      </div>
    );
  }
}

export default withAuth(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { withAuth } from '@okta/okta-react';
import { logoutApiCall } from '../../actions/Session';

export default withAuth(class Header extends Component {
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
          iconElementRight={this.state.authenticated ? 
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Home" href="/" />
              <MenuItem primaryText="Profile" href="/profile" />
              <MenuItem primaryText="Debug" href="/debug" />
              <MenuItem primaryText="Logout" onClick={this.props.auth.logout} />
            </IconMenu> : <FlatButton onClick={this.props.auth.login} label="Login" />}
        />
      </div>
    );
  }
});
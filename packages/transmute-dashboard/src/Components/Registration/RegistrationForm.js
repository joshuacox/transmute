import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'

import { registrationApiCall } from '../../actions/Registration';
import config from '../../app.config';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.oktaAuth = new OktaAuth({ url: config.url });
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async checkAuthentication() {
    const sessionToken = await this.props.auth.getIdToken();
    if (sessionToken) {
      this.setState({ sessionToken });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.registrationApiCall(this.oktaAuth, this.state);
  }

  render() {
    if (this.props.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.props.sessionToken });
      return null;
    }

    const errorMessage = this.props.error ?
      <span className="error-message">{this.props.error}</span> :
      null;

    return (
      <Card>
        <CardTitle
          title='Register'
          subtitle='Register your Transmute account'
        />
        <CardText>
          <TextField
            style={{ width: '100%' }}
            type='text'
            floatingLabelText='First Name'
            value={this.state.firstName}
            onChange={this.handleChange('firstName')}
          />
          <TextField
            style={{ width: '100%' }}
            type='text'
            floatingLabelText='Last Name'
            value={this.state.lastName}
            onChange={this.handleChange('lastName')}
          />
          <TextField
            style={{ width: '100%' }}
            type='email'
            floatingLabelText='Email'
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
          <TextField
            style={{ width: '100%' }}
            type='password'
            floatingLabelText='Password'
            value={this.state.password}
            onChange={this.handleChange('password')}
          />
          {errorMessage}
        </CardText>
        <CardActions style={{ textAlign: 'right' }}>
          <RaisedButton
            style={{ marginRight: '0px' }}
            secondary
            onClick={this.handleSubmit}
            disabled={this.state.firstName.trim().length === 0 || this.state.lastName.trim().length === 0 || this.state.email.trim().length === 0 || this.state.password.trim().length === 0}
            label='Register' />
        </CardActions>
      </Card>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    sessionToken: state.user.sessionToken,
    error: state.user.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    registrationApiCall: (oktaAuth, data) => dispatch(registrationApiCall(oktaAuth, data))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(RegistrationForm));
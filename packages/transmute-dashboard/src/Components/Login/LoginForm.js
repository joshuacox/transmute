import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'

import { loginApiCall } from '../../actions/Login';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      email: '',
      password: ''
    }

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginApiCall(this.oktaAuth, this.state.email, this.state.password);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    if (this.props.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.props.sessionToken });
    }

    const errorMessage = this.props.error ?
      <span className="error-message">{this.props.error}</span> :
      null;

    return (
      <Card>
        <CardTitle
          title='Login'
          subtitle='Login using your Okta credentials'
        />
        <CardText>
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
          <p>Don't have an account? <a href='/register'>Register</a></p>
        </CardText>
        <CardActions style={{ textAlign: 'right' }}>
          <RaisedButton
            style={{ marginRight: '0px' }}
            secondary
            onClick={this.handleSubmit}
            disabled={this.state.email.trim().length === 0 || this.state.password.trim().length === 0}
            label='Login' />
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

const mapDispatchToProps = dispatch => {
  return {
    loginApiCall: (oktaAuth, email, password) => dispatch(loginApiCall(oktaAuth, email, password))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(LoginForm));

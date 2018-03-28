import React, { Component } from 'react';
import { connect } from "react-redux";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { selectWeb3Account } from "../../store/transmute/actions";

class DebugForm extends Component {

  constructor(props) {
    super(props);
    this.accounts = [];
    for (let i = 0; i < props.accounts.length; i++) {
      this.accounts.push(<MenuItem value={props.accounts[i]} key={i} primaryText={`${props.accounts[i]}`} />);
    }
    this.state = { account: props.account == null ? props.accounts[0] : props.account };
  }

  handleChange = (event, index, account) => {
    this.setState({ account })
    selectWeb3Account(account);
    console.log("state: ", this.state);
  };

  render() {
    return (
      <DropDownMenu maxHeight={300} value={this.state.account} onChange={this.handleChange}>
        {this.accounts}
      </DropDownMenu>
    );
  }
};



const mapStateToProps = (state) => {
  console.log("State: ", state);
  return {
    accounts: state.transmute.accounts,
    account: state.transmute.account
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectWeb3Account: (account) => dispatch(selectWeb3Account(account))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugForm);
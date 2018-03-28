import React, { Component } from 'react';
import { connect } from "react-redux";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { selectWeb3Account } from "../../store/transmute/actions";

class HomePage extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = { account: props.account == null ? props.accounts[0] : props.account };
  // }

  // handleChange = (event, index, account) => this.setState({ account });

  render() {
    return (
      <span>stub</span>
      // <DropDownMenu maxHeight={300} value={this.state.account} onChange={this.handleChange}>
      //   {this.props.accounts}
      // </DropDownMenu>
    );
  }
};



// const mapStateToProps = (state) => {
//   console.log("State: ", state);
//   return {
//     accounts: state.transmute.accounts,
//     account: state.transmute.account
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     selectWeb3Account: (account) => dispatch(selectWeb3Account(account))
//   }
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(HomePage);

export default HomePage;
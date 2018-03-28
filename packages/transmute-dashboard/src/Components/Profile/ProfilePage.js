import React from 'react';
import { withAuth } from '@okta/okta-react';
import { changePasswordApiCall } from "../../actions/Profile";
import { connect } from "react-redux";
const ipfsAPI = require('ipfs-api');

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      added_file_hash: null
    };
    this.ipfsApi = ipfsAPI('localhost', '5001')
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getCurrentUser() {
    this.props.auth.getUser()
      .then(user => this.setState({ user }));
  }

  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.onloadend = () => this.saveToIpfs(reader)
    reader.readAsArrayBuffer(file)
  }

  saveToIpfs = (reader) => {
    let ipfsId
    const buffer = Buffer.from(reader.result)
    this.ipfsApi.add(buffer)
      .then((response) => {
        ipfsId = response[0].hash
        this.setState({ added_file_hash: ipfsId })
      }).catch((err) => {
        console.error(err)
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  render() {
    if (!this.state.user) return null;
    return (
      <div>
        <section className="user-profile">
          <h1>User Profile</h1>
          <div>
            <label>Name:</label>
            <span>{this.state.user.name}</span>
          </div>
        </section>
        <section className="user-profile">
          <h1>Signature</h1>
          <div>
            <div>
              <a target="_blank"
                href={'http://localhost:8080/ipfs/' + this.state.added_file_hash}>
                {this.state.added_file_hash}
              </a>
            </div>
            <form id="captureMedia" onSubmit={this.handleSubmit}>
              <input type="file" onChange={this.captureFile} />
            </form>
          </div>
        </section>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
    success: state.user.success
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePasswordApiCall: (data) => dispatch(changePasswordApiCall(data))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(ProfilePage));
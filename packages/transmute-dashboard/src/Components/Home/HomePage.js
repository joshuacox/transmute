import React from 'react';
import { withAuth } from '@okta/okta-react';

class HomePage extends React.Component {
  render() {
    return (
      <div className="Home">
        <h3>Home</h3>
      </div>
    );
  }
}

export default withAuth(HomePage);

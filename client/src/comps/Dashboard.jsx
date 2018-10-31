import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Stories from './Stories.jsx';

class Dashboard extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <Stories />
      </div>
    );
  }
}

export default connect(
  null,
  {},
)(Dashboard);

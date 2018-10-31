import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
import axios from 'axios';

import NavBar from './NavBar.jsx';
import Stories from './Stories.jsx';
import ToolBar from './ToolBar.jsx';
import * as actions from '../actions/actions';
import store from '../store/store';

class StoriesTop extends React.Component {
  componentWillMount() {
    console.log('props', this.props.fetchStories);
    this.props.fetchStories('94121');
    // axios.get('http://localhost:8000/zipcode?ID=94121')
    //   .then(res => console.log(res));
  }

  render() {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div id="main-body">
          <ToolBar hoodClickHandler={this.props.fetchStories} />
          <div id="placeholder">Top Stories in Bay Area</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.stories;

const mapActionsToProps = (dispatch) => {
  bindActionCreators(
    {
      fetchStories: actions.fetchStories,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(StoriesTop);
// connect(null, actions.fetchStories)(StoriesTop);

ReactDOM.render(
  <Provider store={store}>
    <StoriesTop />
  </Provider>,
  document.getElementById('App'),
);

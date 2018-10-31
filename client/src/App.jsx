import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import jwt_decode from 'jwt-decode';
import $ from 'jquery';
import axios from 'axios';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import NavBar from './comps/NavBar.jsx';
import Stories from './comps/Stories.jsx';
import ToolBar from './comps/ToolBar.jsx';
import TopStoriesBar from './comps/TopStoriesBar.jsx';
import Footer from './comps/Footer.jsx';
import Landing from './comps/Landing.jsx';
import Register from './comps/auth/Register.jsx';
import Login from './comps/auth/Login.jsx';
import Dashboard from './comps/Dashboard.jsx';

import * as actions from './actions/actions';
import store from './store/store';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends React.Component {
  componentWillMount() {}

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/stories" component={Stories} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => state.stories;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStories: actions.fetchStories,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

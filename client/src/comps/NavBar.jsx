import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';

class NavBar extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a href="#" onClick={this.onLogoutClick} className="nav-link">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
            />
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/stories">
            See Stories
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      // <div id="nav-bar">
      //   <img src="images/community-news-logo.png" alt="community-news-logo" />
      //   <div className="search">
      //     <form>
      //       <input type="text" placeholder="search for inspiring community stories" name="search" />
      //       <button
      //         type="submit"
      //         style={{
      //           backgroundImage:
      //             'url(http://www.clker.com/cliparts/w/r/Q/0/x/D/search-icon-light-grey-md.png)',
      //           backgroundSize: 'cover',
      //         }}
      //       />
      //     </form>
      //   </div>
      //   <div id="title">Community News</div>
      //   <div id="nav-buttons">
      //     <button className="nav-button">Top Stories</button>
      //     <button className="nav-button">Your Stories</button>
      //     <button className="nav-button">Contact</button>
      //     <button className="nav-button">Settings</button>
      //   </div>
      // </div>

      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Community News
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    user: PropTypes.shape({}),
  }).isRequired,
  // errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser },
)(NavBar);

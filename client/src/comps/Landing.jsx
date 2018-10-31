import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchStories, updateVote } from '../actions/actions';
import StoryEntry from './StoryEntry.jsx';

class Landing extends Component {
  componentWillMount() {
    this.props.fetchStories();
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didInvalidate === true) {
      this.props.fetchStories();
    }
  }

  render() {
    // if (this.props.stories.filterBy.topStories.items.length === 0) return null;

    return (
      <div className="landing">
        <div className="landing-inner text-light">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 text-center landing-row1">
                <h1 className="display-3 mb-4">MNA Web Services</h1>
                <p className="lead">Creating high quality, dynamic web content</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center landing-row2">
                <h1 className="display-3 mb-4">the sky's the limit</h1>
                <p className="lead">anything you can think up we can do</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center landing-row3">
                <h1 className="display-3 mb-4">keep it simple</h1>
                <p className="lead">
                  we take the pain out of setting up your website so you can focus on the business
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center landing-row4">
                <h1 className="display-3 mb-4">fourth row</h1>
                <p className="lead">fourth row stuff</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  fetchStories: PropTypes.func.isRequired,
  stories: PropTypes.shape({
    filterBy: PropTypes.shape({
      topStories: PropTypes.shape({
        items: PropTypes.arrayOf(
          PropTypes.shape({
            author: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            county: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
            nominations: PropTypes.number.isRequired,
            photo_url: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            tag: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            upvotes: PropTypes.number.isRequired,
            zipcode: PropTypes.number.isRequired,
          })
        ),
      }),
    }).isRequired,
  }).isRequired,
  // errors: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStories,
      updateVote,
    },
    dispatch
  );

const mapStateToProps = state => ({
  auth: state.auth,
  stories: state.stories,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);

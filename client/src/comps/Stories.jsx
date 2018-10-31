import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import StoryEntry from './StoryEntry.jsx';
import { fetchStories, updateVote } from '../actions/actions';

class Stories extends React.Component {
  componentWillMount() {
    this.props.fetchStories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didInvalidate === true) {
      this.props.fetchStories();
    }
  }

  render() {
    return (
      <div id="stories">
        <h1>Local News</h1>
        {this.props.stories.filterBy.topStories.items.map(story => (
          <StoryEntry className="story-entry medium" story={story} key={story._id} />
        ))}
      </div>
    );
  }
}

Stories.propTypes = {
  fetchStories: PropTypes.func.isRequired,
  stories: PropTypes.shape({
    filterBy: PropTypes.shape({
      topStories: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
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
        })),
      }),
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  stories: state.stories,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchStories,
      updateVote,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Stories);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TopStoryEntry from './TopStoryEntry.jsx';
import { fetchStories, updateVote } from '../actions/actions';

class TopStoriesBar extends React.Component {
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
      <div id="top-stories">
        <h1>More Stories</h1>
        {this.props.filterBy.topStories.items.map(story => (
          <TopStoryEntry story={story} key={story._id} />
        ))}
      </div>
    );
  }
}

TopStoriesBar.propTypes = {
  fetchStories: PropTypes.func.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
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
  geoScope: PropTypes.string,
};

const mapStateToProps = state => state.stories;

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
)(TopStoriesBar);

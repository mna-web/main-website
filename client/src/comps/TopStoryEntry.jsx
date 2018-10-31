import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../actions/actions';

function TopStoryEntry(props) {
  return (
    <div className="top-story-entry" data-id={props.story._id}>
      <img src={props.story.photo_url} alt="user post" />
      <div className="top-story-teaser">
        <span className="top-story-title">{props.story.title}</span>
      </div>
    </div>
  );
}

TopStoryEntry.propTypes = {
  story: PropTypes.shape({
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
  }).isRequired,
  updateVote: PropTypes.func.isRequired,
  updateNomination: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
};

const mapStateToProps = state => state.stories;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateVote: actions.updateVote,
      updateNomination: actions.updateNomination,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopStoryEntry);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../actions/actions';

function StoryEntry(props) {
  const onVoteClick = (e) => {
    const ID = e.target.closest('.story-entry').getAttribute('data-id');
    let voteCount = null;
    if (e.target.alt === 'upvotes') {
      voteCount = e.target.nextSibling.innerHTML;
    } else if (isNaN(e.target.innerHTML) === false) {
      voteCount = e.target.innerHTML;
    } else {
      voteCount = e.target.getElementsByTagName('span').innerHTML;
    }
    props.updateVote(ID, voteCount);
  };

  const onNominationClick = (e) => {
    const ID = e.target.closest('.story-entry').getAttribute('data-id');
    let nomCount = null;
    if (e.target.alt === 'nominations') {
      nomCount = e.target.nextSibling.innerHTML;
    } else if (isNaN(e.target.innerHTML) === false) {
      nomCount = e.target.innerHTML;
    } else {
      nomCount = e.target.getElementByTagName('span').innerHTML;
    }
    props.updateNomination(ID, nomCount);
  };

  return (
    <div className="row">
      <div className="col-8">
        <div className="media" data-id={props.story._id}>
          <img className="mr-3" src={props.story.photo_url} alt="user post" />
        </div>
      </div>
      <div className="col-4">
        <h5>{props.story.author}</h5>
        {/* <p className="text-truncate">{props.story.text}</p> */}
      </div>
    </div>
  );
}

StoryEntry.propTypes = {
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
)(StoryEntry);

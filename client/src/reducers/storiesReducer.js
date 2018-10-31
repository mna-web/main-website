import { merge } from 'lodash';
import * as types from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  isPublishing: false,
  didInvalidate: false,
  stories: [],
  currentPageStories: [],
  filterBy: {
    topStories: {
      items: [],
    },
  },
  geoScope: null,
};

export default function storiesReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_STORIES_REQUEST:
      return merge({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case types.FETCH_STORIES_SUCCESS:
      return merge({}, state, {
        isFetching: false,
        didInvalidate: false,
        stories: action.payload.data,
        geoScope: action.geoScope,
        filterBy: {
          topStories: {
            items: action.payload.data.slice(0, 9),
          },
        },
      });
    case types.FETCH_STORIES_FAILURE:
      return merge({}, state, {
        isFetching: false,
        didInvalidate: false,
      });
    case types.PUBLISH_STORY_REQUEST:
      return merge({}, state, {
        isPublishing: true,
      });
    case types.PUBLISH_STORY_SUCCESS:
      return merge({}, state, {
        isPublishing: false,
        didInvalidate: true,
      });
    case types.PUBLISH_STORY_FAILURE:
      return merge({}, state, {
        isPublishing: false,
      });
    case types.UPVOTE_UPDATE_SUCCESS:
      return merge({}, state, {
        didInvalidate: true,
      });
    default:
      return state;
  }
}

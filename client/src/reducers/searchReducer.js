import { merge } from 'lodash';
import * as types from '../actions/actionTypes';

const initialState = {
  isFetching: false,
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

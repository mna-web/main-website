import { merge } from 'lodash';
import * as types from '../actions/actionTypes';

const initialState = {
  modalType: null,
  modalProps: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_STORY_SHOW:
      return merge({}, state, {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type,
      });
    case types.CREATE_STORY_HIDE:
      return initialState;
    default:
      return state;
  }
};

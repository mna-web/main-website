import * as types from '../actions/actionTypes';

const initialState = {};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}

import axios from 'axios';

import * as types from './actionTypes';

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: types.GET_PROFILE,
        payload: res.data,
      }))
    .catch(err =>
      dispatch({
        type: types.GET_PROFILE,
        payload: {},
      }));
};

export const setProfileLoading = () => ({
  type: types.PROFILE_LOADING,
});

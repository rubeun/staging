import { getInitialData } from '../utils/api';
import { receiveShows } from './shows';
import { receivePerformers } from './performers';
import { showLoading, hideLoading } from 'react-redux-loading';

// ### ACTION CREATORS ###

// @ REDUX THUNK needed to allow returning of a function (middleware) @
// make API call to get initial data using promise to async dispatch users and tweets when data is received
export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    // API call from api.js. When promise resolved, get users & tweets
    return getInitialData()
      .then(({shows, performers }) => {
        dispatch(receiveShows(shows));
        dispatch(receivePerformers(performers));
        dispatch(hideLoading());
      })
  }
}
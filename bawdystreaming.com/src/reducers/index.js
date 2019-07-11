import { combineReducers } from 'redux';
import shows from './shows';
import performers from './performers';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
  shows,
  performers,
  loadingBar: loadingBarReducer
})
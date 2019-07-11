import { RECEIVE_SHOWS } from '../actions/shows';

// ### USERS REDUCERS ###
// perform action on state and return a new updated state or orginal state if no action
export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_SHOWS :
      return {
        ...state,
        ...action.shows
      }
      // ## TODO ##
      // add show  

    default :
      return state;
  }
}

import { RECEIVE_PERFORMERS } from '../actions/performers';

// ### USERS REDUCERS ###
// perform action on state and return a new updated state or orginal state if no action
export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_PERFORMERS :
      return {
        ...state,
        ...action.performers
      }
      // ## TODO ##
      // add performer  
      
      default :
      return state;
  }
}
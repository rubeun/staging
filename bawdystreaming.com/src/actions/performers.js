export const RECEIVE_PERFORMERS = 'RECEIVE_PERFORMERS';

// ### ACTION CREATORS ###
// return performers
export function receivePerformers(performers) {
  return {
    type: RECEIVE_PERFORMERS,
    performers
  }
}

// ## TODO ##
// add performer
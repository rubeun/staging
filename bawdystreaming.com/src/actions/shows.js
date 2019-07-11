export const RECEIVE_SHOWS = 'RECEIVE_SHOWS';

// ### ACTION CREATORS ###
// return shows
export function receiveShows(shows) {
  return {
    type: RECEIVE_SHOWS,
    shows
  }
}

// ## TODO ##
// add show
// Bawdy API

// JSON data in public/data folder
const showsObj = "../data/shows.json";
const performersObj = "../data/performers.json";

// Returns all show data from API
function _getShows() {
  return new Promise((res, rej) => {
    fetch(showsObj)
      .then(res => res.json())
      .then(
        (result) => {
          res(result.shows);
        },
        (error) => {
          rej(error);
        }
      )
  })
}

// Returns all performer data from API
function _getPerformers() {
  return new Promise((res, rej) => {
    fetch(performersObj)
      .then(res => res.json())
      .then(
        (result) => {
          res(result.performers)
        },
        (error) => {
          rej(error)
        }
      )
  })
}

// ## TODO ##
// Add a show

// Add a performer


// resolve shows & performers and returns when loaded
export function getInitialData() {
  return Promise.all([
    //_testFetch(),
    _getShows(),
    _getPerformers(),
  ]).then(([shows, performers]) => ({
    shows,
    performers,
  }))
}
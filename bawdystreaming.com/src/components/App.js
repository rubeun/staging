import React, { Component, Fragment } from 'react';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Main from './Main';
import Nav from './Nav';
import About from './About';
import Live from './Live';
import Videos from './Videos';
import Footer from './Footer';

class App extends Component {

  // when App is mounted, get data from store
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                <Route path='/' exact component={Main} />
                <Route path='/about' component={About} />
                <Route path='/live' component={Live} />
                <Route path='/vod' component={Videos} />
              </div>
            }
            <Footer />
          </div>
        </Fragment>
      </Router>
    )
  }
}

// App should only show Main when handleInitialData is complete.
// So set loading to check if authedUser is set. When set, all data is available 
function mapStateToProps({shows}) {
  return {
    loading: shows === null
  }
}

// connect upgrades App component to an App container that can get state from store & dispatch action
export default connect(mapStateToProps)(App);
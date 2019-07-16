import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {

  state = {
    navMenuExpanded: false
  }

  // Toggle between nav menu being expanded or closed
  handleToggleMenu = () => {
    this.setState({
      navMenuExpanded: !this.state.navMenuExpanded
    });
  }

  render() {
    let { navMenuExpanded } = this.state;

    return (
      <Fragment>
        <img className="nav-icon" src="../img/icons8-menu-30.png" onClick={() => this.handleToggleMenu()} alt="navigation menu icon" aria-hidden="true" />
        <nav id='cssmenu'>
          <ul className={`clear ${navMenuExpanded ? "is-expanded" : "collapsed"}`}>
            <li>
              <NavLink to='/' exact activeClassName='active'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/live' activeClassName='active'>
                Live Show
              </NavLink>
            </li>
            <li>
              <NavLink to='/vod' activeClassName='active'>
                VOD/Past Shows
              </NavLink>
            </li>
            <li>
              <NavLink to='/about' activeClassName='active'>
                About
              </NavLink>
            </li>
            <li>
              <a href="http://www.bawdystorytelling.com">Bawdy Storytelling Website</a>
            </li>
          </ul>
        </nav>	
      </Fragment>		
    )
  }
}

export default Nav
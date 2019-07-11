import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav id='cssmenu'>
      <ul>
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
  )
}
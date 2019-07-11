import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Main() {
  return (
    <div className="home-promo">
      <div className="home-promo-copy">
        <h3>Watch Bawdy Storytelling from the comfort of your home.</h3>
        <p>Bawdy Storytelling features real people sharing their bona fide sexual exploits in 10 minutes or less, Think of us as a One Night Stand with the Moth & Savage Love. Storytellers are an eclectic mix of authors, pornstars, comedians, sex educators and actors, along with a handful of real people just like you who have submitted their stories online and were chosen for their panache and sense of misadventure. Each evening of true dirty stories features tales of carnal wins and epic fails with no scripts, no nets and no holds barred. You may even go home with a few new tricks for your boudoir arsenal!</p> 
        <p>Watch the <NavLink to='/live'>Live</NavLink> or Previously Recorded Broadcasts <NavLink to='/vod'>On Demand</NavLink> at your leisure.</p>
      </div>
    </div>
  )
}
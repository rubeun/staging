import React, { Fragment } from 'react';
import Player from './Player';

export default function Live() {
  let liveShowURL = "//iframe.dacast.com/b/52952/c/240490";
  return (
    <Fragment>
      <div className="video-stream clear">
        <h3 id="stream-title">Bawdy Live Web Stream</h3>
        <p>Next Stream: <span id="live-title"></span></p>
        
        <Player showID={liveShowURL} />

        <p>If you have any issues during the show, please text Rubeun at (415) 937-7236.</p>
        <p>To watch show after broadcast has completed, please go to the <a href="/videos/">VOD</a> page</p>
      </div>			
      <div className="chat">
        <h3>Bawdy Storytelling Chat</h3>
        <div id="chat-name">
          <span className="blink">Chat name: </span>
          <input type="text" id="chat-name-input" cols="10" placeholder="Type Name & Hit Return" autoFocus></input>
        </div>
        <div id="chat-box" name="chatBox"></div>
      </div>
    </Fragment>
  )
}

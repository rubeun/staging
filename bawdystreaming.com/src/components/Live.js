import React, { Fragment } from 'react';
import Player from './Player';

export default function Live() {
  let liveShowURL = "//iframe.dacast.com/b/52952/c/240490";
  let liveShowTitle = "Bawdy Streaming Live";
  return (
    <Fragment>
      <div className="video-stream clear">
        <h3 id="stream-title">Bawdy Live Web Stream</h3>
        
        <Player src={liveShowURL} title={liveShowTitle} width="720" height="400" />

        <p className="stream-info">If you have any issues during the show, please text Rubeun at (415) 937-7236.</p>
        <p className="stream-info">To watch show after broadcast has completed, please go to the <a href="/videos/">VOD</a> page</p>
      </div>			

      <div className="chat">
        <h3>Bawdy Storytelling Chat</h3>
        <div id="chat-name">
          <span className="blink">Chat name: </span>
          <input type="text" id="chat-name-input" cols="10" placeholder="Type Name & Hit Return"></input>
        </div>
        <div id="chat-box" name="chatBox"></div>
      </div>
    </Fragment>
  )
}

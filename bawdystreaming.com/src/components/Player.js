import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {

  render() {
    const { showLoading, showURL } = this.props;

    return (
      // {showLoading === true
      //   ? null
      //   : <iframe id="video-iframe" src={showURL} width="720" height="400" frameBorder="0" scrolling="no" allowFullScreen={true} webkitallowfullscreen="true" mozallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true"></iframe>
      // }
      <iframe id="video-iframe" src={showURL} width="720" height="400" frameBorder="0" scrolling="no" allowFullScreen={true} webkitallowfullscreen="true" mozallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true" />      
    )  
  }
}

function mapStateToProps({}, {showID}) {
  return {
    showLoading: showID === null,
    showID
  }
}

export default connect(mapStateToProps)(Player);
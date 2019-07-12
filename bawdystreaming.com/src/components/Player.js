import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {

  // propTypes: {
  //   src: React.PropTypes.string.isRequired,
  //   onLoad: React.PropTypes.func
  // }
  
  componentDidMount() {
//    this.refs.iframe.getDOMNode().addEventListener('load', this.props.onLoad);
  }

  render() {
    //const { showLoading, showURL } = this.props;

    return <iframe ref="iframe" id="video-iframe" {...this.props} allowFullScreen={true} />      
  }
}

function mapStateToProps({}, {src, width, height, title}) {
  return {
    src,
    width,
    height,
    title,
    msallowfullscreen: "true",
    oallowfullscreen: "true",
    mozallowfullscreen: "true",
    webkitallowfullscreen: "true",
    scrolling: "no",
    frameBorder: "0"
  }
}

export default connect(mapStateToProps)(Player);
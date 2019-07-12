import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from './Player';

class Videos extends Component {

  state = {
    currentShowIndex: 0,
    currentShowTitle: "Bawdy Storytelling May 2018",
    currentShowSRC: "//iframe.dacast.com/b/52952/f/559508"
  }

  chooseVideo = (selectedShowIndex) => {
    const shows = this.props;

    let selectedShowTitle = shows.shows[selectedShowIndex].title;
    let selectedShowSRC = shows.shows[selectedShowIndex].dacastSRC;

    this.setState((state) => ({
      ...state,
      currentShowIndex: selectedShowIndex,
      currentShowTitle: selectedShowTitle,
      currentShowSRC: selectedShowSRC
    }));
  }

  render() {
    const { loading, shows } = this.props;
    let showsArr = [];
    let showsLoaded = false;

    // put all pets info into an array for easier mapping
    if (!loading) {
      Object.entries(shows).forEach(show => {
        showsArr.push(show[1]);
        console.log(show[1]);
      })
      // this.setState((state) => ({
      //   ...state,
      //   allShowsArr: showsArr
      // }));  
      showsLoaded = true;      
    }


    return (
      <div className='videos-main'>

        <p className='video-title'>{this.state.currentShowTitle}</p>
        <Player src={this.state.currentShowSRC} title={this.state.currentShowTitle} width="720" height="400" />
              
        <div className="vod">
          <h3>Bawdy Storytelling Videos</h3>
          <div id="vod-box">
            <ul>
              {showsLoaded === false
                ? null
                : showsArr.map((show, index) => (
                    <li key={index} onClick={() => this.chooseVideo(index)}>{show.title}</li>
                  ))
              }
            </ul>
          </div>		
          
        </div>
      </div>
    )
  }
}

function mapStateToProps({shows}) {
  return {
    loading: shows === null,
    shows
  }
}

export default connect(mapStateToProps)(Videos);
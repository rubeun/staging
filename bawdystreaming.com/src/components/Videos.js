import React, { Component } from 'react';
import { connect } from 'react-redux';
import Player from './Player';

class Videos extends Component {

  state = {
    showID: "",
    showTitle: "",
    dacastSRC: ""
  }

  chooseVideo = (showID) => {
    console.log(showID);
  }

  render() {
    const { loading, shows } = this.props;
    let showsArr = [];
    let showsLoaded = false;

    // put all pets info into an array for easier mapping
    if (!loading) {
      Object.entries(shows).forEach(show => {
        showsArr.push(show);
      })
      // shows.map((show) => {
      //   showsArr.push(show);
      // })
      showsLoaded = true;      
    }


    return (
      <div className='videos-main'>
        
        <Player />
              
        <div className="vod">
          <h3>Bawdy Storytelling Videos</h3>
          <div id="vod-box">
            <ul>
              {showsLoaded === false
                ? null
                : showsArr.map((show) => (
                    <li key={show}>{show.id}</li>
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
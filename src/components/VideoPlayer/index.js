import React from 'react';
// import VideoComponent from 'videojs-react';
import VideoComponent from './Video';

import CourseContext from '../../context';

export default class Video extends React.Component {
  static contextType = CourseContext;

  videoRef = React.createRef();

  state = {};

  controls = {
    pause: x => {
      debugger;
    },
    play: i => {
      debugger;
    }
  };

  currentTime = () => {
    alert(this.context.video.currentTime());
  };

  setVideo = vid => {
    debugger;
    this.context.setVideo(vid);
  };

  video;

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    console.log(this.videoRef.current);
    return (
      <>
        <VideoComponent
          controls={this.controls}
          innerRef={this.videoRef}
          accessVideo={this.setVideo}
        />
        <button style={{ position: 'absolute' }} onClick={this.currentTime}>
          currentTim
        </button>
      </>
    );
  }
}

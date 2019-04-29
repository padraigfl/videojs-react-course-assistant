import React from 'react';
// import VideoComponent from 'videojs-react';
import { styled } from 'linaria/react';
import VideoComponent from './Video';

import CourseContext from '../../context';

const VideoWrapper = styled('div')`
  flex-grow: 1;
  height: 100%;
`;

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

  currentDescription = () => {
    debugger;
    if (!this.context.currentlyPlaying) {
      return null;
    }
    const currentTrack = this.context.playlist.items[
      this.context.currentlyPlaying.number
    ];
    if (currentTrack) {
      return currentTrack.description;
    }
  };

  setVideo = vid => {
    this.context.setVideo(vid);
  };

  video;

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    console.log(this.videoRef.current);
    return (
      <VideoWrapper>
        <VideoComponent
          controls={this.controls}
          innerRef={this.videoRef}
          accessVideo={this.setVideo}
        />
        <button
          type="button"
          style={{ position: 'absolute' }}
          onClick={this.currentTime}
        >
          currentTim
        </button>
        <div>{this.currentDescription()}</div>
      </VideoWrapper>
    );
  }
}

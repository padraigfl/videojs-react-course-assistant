import React from 'react';
// import VideoComponent from 'videojs-react';
import { styled } from 'linaria/react';
import VideoComponent from './Video';

import CourseContext from '../../context';
import { Heading } from '../styledShared';

const VideoWrapper = styled('div')`
  flex-grow: 1;
  height: 100%;
`;

export default class Video extends React.Component {
  static contextType = CourseContext;

  videoRef = React.createRef();

  state = {};

  currentTime = () => {
    window.alert(this.context.video.currentTime());
  };

  currentDescription = () => {
    const currentTrackNumber =
      this.context.currentlyPlaying && this.context.currentlyPlaying.number;
    if (
      !currentTrackNumber ||
      this.context.playlist.items.length < currentTrackNumber + 1
    ) {
      return null;
    }
    const currentTrack = this.context.playlist.items[currentTrackNumber];
    return currentTrack.description;
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
      <VideoWrapper className="Video Column">
        <Heading className="invert">React-coursebuilder</Heading>
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
          currentTime
        </button>
        <div>{this.currentDescription()}</div>
      </VideoWrapper>
    );
  }
}

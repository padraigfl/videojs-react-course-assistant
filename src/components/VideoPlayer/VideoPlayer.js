import React from 'react';
// import VideoComponent from 'videojs-react';
import { styled } from 'linaria/react';
import VideoComponent from './Video';

import CourseContext from '../../context';
import { Heading } from '../styledShared';
import { spacings, colors } from '../../constants/styles';

const border = `${spacings.xs}px solid ${colors.dark2}`;

const VideoWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-left: ${border};
  border-right: ${border};
`;

const Description = styled('div')`
  overflow: scroll;
  background-color: ${colors.light};
  padding: ${spacings.s}px;
`;

export default class Video extends React.Component {
  static contextType = CourseContext;

  videoRef = React.createRef();

  state = {};

  currentDescription = () => {
    const currentTrackNumber =
      this.context.currentlyPlaying && this.context.currentlyPlaying.video;
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
        <VideoComponent innerRef={this.videoRef} accessVideo={this.setVideo} />
        <Description>{this.currentDescription()}</Description>
      </VideoWrapper>
    );
  }
}

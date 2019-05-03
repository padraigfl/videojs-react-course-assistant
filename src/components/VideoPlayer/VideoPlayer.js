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
  margin-top: ${spacings.xs}px;
  flex-grow: 1;
`;

export default class Video extends React.Component {
  static contextType = CourseContext;

  videoRef = React.createRef();

  state = {};

  currentDescription = () => {
    const currentTrackNumber =
      this.context.currentlyPlaying && this.context.currentlyPlaying.video;
    if (!currentTrackNumber || currentTrackNumber < 0) {
      return null;
    }
    const currentId = this.context.playlist.order[currentTrackNumber];
    const currentTrack = this.context.playlist.items[currentId];
    if (currentTrack) return currentTrack.description;
    return null;
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
    const currentId = this.context.getCurrentlyPlayingId();
    return (
      <VideoWrapper className="Video Column">
        <Heading className="invert">
          {currentId
            ? this.context.playlist.items[currentId].title
            : 'Coursebuilder'}
        </Heading>
        <VideoComponent innerRef={this.videoRef} accessVideo={this.setVideo} />
        <Description>{this.currentDescription()}</Description>
      </VideoWrapper>
    );
  }
}

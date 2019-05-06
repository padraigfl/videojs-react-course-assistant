import React from 'react';
// import VideoComponent from 'videojs-react';
import { css } from 'linaria';
import { styled } from 'linaria/react';
import VideoComponent from './Video';

import CourseContext from '../../context';
import { Heading } from '../styledShared';
import { spacings, colors } from '../../constants/styles';

const VideoWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  @media (min-height: 800px) {
    min-height: 50vh;
    margin: 0px 4px;
  }
`;

const videoStyles = css`
  flex-grow: 1;
  width: 100%;
  @media (max-width: 1000px) and (min-height: 1000px) {
    min-height: 50vh;
  }
`;

const Description = styled('div')`
  overflow: scroll;
  background-color: ${colors.dark1};
  color: ${colors.accent};
  padding: ${spacings.s}px;
  margin-top: ${spacings.xs}px;
  height: 200px;
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
      <VideoWrapper
        className={`Video Column ${
          this.props.isActive ? 'Column--selected' : ''
        }`}
      >
        <Heading>
          {currentId
            ? this.context.playlist.items[currentId].title
            : 'Coursebuilder'}
        </Heading>
        <VideoComponent
          className={videoStyles}
          innerRef={this.videoRef}
          accessVideo={this.setVideo}
        />
        <Description>{this.currentDescription()}</Description>
      </VideoWrapper>
    );
  }
}

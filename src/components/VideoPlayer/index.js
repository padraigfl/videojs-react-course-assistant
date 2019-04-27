import React from 'react';
import VideoComponent from 'videojs-react';

export default class Video extends React.Component {
  video = React.createRef();

  state = {};

  controls = {
    pause: () => {
      debugger;
    },
    play: () => {
      debugger;
    }
  };

  show = () => this.setState(state => ({ video: !state.video }));

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    console.log(this.video.current);
    return <VideoComponent controls={this.controls} innerRef={this.video} />;
  }
}

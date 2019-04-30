import React from 'react';

class VideoPlayer extends React.Component {
  static defaultProps = {
    id: 'vid1',
    className: 'video-js vjs-default-skin vjs-16-9',
    // width: '640',
    // height: '360',
    setup: {
      techOrder: ['youtube'],
      sources: [
        {
          type: 'video/youtube',
          src: 'https://www.youtube.com/watch?v=TeccAtqd5K8'
        }
      ]
    },
    innerRef: React.createRef(),
    accessVideo: () => {}
  };

  state = {};

  componentDidMount() {
    if (!videojs) {
      this.setState({ noVideoJs: 'videojs' });
    } else if (this.needsYoutube() && !this.hasYoutube()) {
      this.setState({ noVideoJs: 'youtube' });
    } else {
      this.instantiate();
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.props.setVideo(null);
      this.player.dispose();
    }
  }

  needsYoutube = () =>
    this.props.youtube ||
    this.props.setup.techOrder.find(tech => tech.toLowerCase === 'youtube');

  hasYoutube = () => videojs && videojs.getTech('youtube');

  /* TODO
   * Fallbacks do not currently work
   * videojs-youtube defaults to a different version of video.js than imported
   */

  // videoJsFallback = () => import('video.js').then(this.youtubeFallback);

  // youtubeFallback = () => {
  //   if (this.props.youtube || this.props.setup.techOrder.find(tech => tech.toLowerCase === 'youtube')) {
  //     import('videojs-youtube').then(() => {
  //       this.instantiate();
  //     });
  //   }
  // };

  instantiate = () => {
    this.player = videojs(
      this.props.innerRef.current,
      this.props.setup,
      this.props.onReadyCheck ? () => this.props.onReadyCheck(this) : undefined
    );
    this.props.accessVideo(this.player);
  };

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    const { setup, onReadyCheck, innerRef, accessVideo, ...rest } = this.props;
    if (this.state.noVideoJs === 'videojs') {
      return <div>Wheres Videojs?</div>;
    }
    if (this.state.noVideoJs === 'youtube') {
      return <div>Wheres the youtube support</div>;
    }
    return (
      <div data-vjs-player>
        <video
          className="video-js "
          controls
          preload="auto"
          {...rest}
          ref={this.props.innerRef}
        />
      </div>
    );
  }
}

export default VideoPlayer;

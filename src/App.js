import React from 'react';

import Playlist from './components/Playlist';
import VideoPlayer from './components/VideoPlayer';

const App = props => {
  return (
    <div>
      <Playlist />
      <VideoPlayer />
    </div>
  );
};

export default App;

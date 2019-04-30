import React from 'react';
import { css } from 'linaria';
import Playlist from './components/Playlist';
import VideoPlayer from './components/VideoPlayer';
import { CourseProvider } from './context';
import { colors, spacings } from './constants/styles';
import Notes from './components/Notes';

const bodyStyle = css`
  background-color: ${colors.dark2};
  color: ${colors.dark1};
  margin: ${spacings.xs}px;
  display: flex;
  height: calc(100vh - ${spacings.xs * 2}px);

  :global() {
    body {
      font-family: Arial;
      background-color: ${colors.dark1};
      margin: 0px;
    }
  }
  @media (min-width: 600px) {
    .Column.Video {
      order: 0;
    }
  }
`;

const App = () => {
  return (
    <CourseProvider>
      <div className={bodyStyle}>
        <Playlist />
        <VideoPlayer maxWidth="80%" />
        <Notes />
      </div>
    </CourseProvider>
  );
};

export default App;

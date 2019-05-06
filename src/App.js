import React from 'react';
import { css } from 'linaria';
import Playlist from './components/Playlist';
import VideoPlayer from './components/VideoPlayer';
import { CourseProvider } from './context';
import { colors, spacings } from './constants/styles';
import Notes from './components/Notes';

const margin = spacings.xs;

const banner = css`
  display: flex;
`;

const bodyStyle = css`
  background-color: #111;
  color: ${colors.accent};
  display: flex;
  flex-grow: 1;
  position: relative;

  :global() {
    body {
      font-family: Arial;
      background-color: ${colors.dark2};
      margin: 0px;
    }
    #courseBuilder {
      display: flex;
      flex-direction: column;
      padding: ${margin}px ${margin / 2}px;
      height: calc(100vh - ${margin * 2}px);
    }
  }
  @media (max-width: 1000px) and (max-height: 999px) {
    height: 100vh;
    flex-wrap: wrap;
    .Column.Video {
      width: 100%;
    }
    .Column--selected {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      max-width: 100%;
      width: 100%;
    }
    .Column:not(.Column--selected) {
      display: none;
    }
  }
  @media (max-width: 1000px) and (min-height: 1000px) {
    height: initial;
    flex-wrap: wrap;
    .Column.Video {
      order: -1;
      width: 100%;
    }
    .Column:not(.Video) {
      max-width: initial;
      flex-grow: 1;
    }
  }
`;

const viewButtonStyle = css`
  display: none;
  @media (max-width: 1000px) and (max-height: 999px) {
    display: flex;
  }
`;

const ViewOption = ({ value = '', update }) => (
  <button type="button" onClick={() => update(value)}>
    {value[0].toUpperCase()}
  </button>
);

const keys = ['playlist', 'video', 'notes'];
const App = () => {
  const [active, updateActive] = React.useState(keys[0]);
  return (
    <CourseProvider>
      <div className={banner}>
        courseBuilder
        <div className={viewButtonStyle}>
          {keys.map(k => (
            <ViewOption key={k} value={k} update={updateActive} />
          ))}
        </div>
      </div>
      <div className={bodyStyle}>
        <Playlist isActive={active === 'playlist'} />
        <VideoPlayer maxWidth="80%" isActive={active === 'video'} />
        <Notes isActive={active === 'notes'} />
      </div>
    </CourseProvider>
  );
};

export default App;

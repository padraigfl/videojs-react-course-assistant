import React from 'react';
import { css } from 'linaria';
import { styled } from 'linaria/react';
import Playlist from './components/Playlist';
import VideoPlayer from './components/VideoPlayer';
import { CourseProvider } from './context';
import { colors, spacings } from './constants/styles';
import Notes from './components/Notes';
import Heading from './components/Heading/Heading';

const margin = spacings.xs;

const banner = css`
  display: flex;
  background-color: ${colors.dark2};
  color: ${colors.accent};
  align-items: center;
  padding: 0px ${spacings.xs / 2}px;
`;

const bodyStyle = css`
  background-color: #111;
  color: ${colors.accent};
  display: flex;
  flex-grow: 1;
  position: relative;
  padding: ${spacings.xs}px;

  :global() {
    body {
      font-family: Arial;
      background-color: ${colors.dark2};
      margin: 0px;
    }
    #courseBuilder {
      display: flex;
      flex-direction: column;
      height: 100vh;
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
    button {
      margin-left: ${spacings.xs}px;
      padding: ${spacings.xs}px ${spacings.xs}px;
      &:disabled {
        background-color: ${colors.brand};
        outline: none;
        border: none;
        color: ${colors.light};
        font-weight: bold;
      }
    }
  }
`;

const ViewOption = ({ value = '', update, active }) => (
  <button
    type="button"
    onClick={() => update(value)}
    disabled={active === value}
  >
    {value[0].toUpperCase()}
  </button>
);

const Link = props => (
  <a href={props.href} target="_blank" rel="noopener noreferrer">
    {props.text}
  </a>
);

const keys = ['playlist', 'video', 'notes'];
const App = () => {
  const [active, updateActive] = React.useState(keys[0]);
  return (
    <CourseProvider>
      <Heading
        className={`${banner} invert`}
        icon="?"
        settingsView={
          <div>
            <h3>Project</h3>
            <p>
              This project is built with React, Linaria and VideoJS, using the
              Context API quite messily. More details are available on{' '}
              <Link
                href="https://github.com/padraigfl/videojs-react-course-assistant"
                text="the Github page"
              />{' '}
              (e.g. future goals). Collaboration and feedback is strongly
              welcomed.
            </p>
            <hr />
            <h3>About Me</h3>
            <p>
              I am a London based frontend developer trying to find fun side
              projects to do and collaborate on. Feel free to look at my work
              and get in touch via{' '}
              <Link href="https://github.com/padraigfl" text="LinkedIn" /> or{' '}
              <Link href="https://github.com/padraigfl" text="Github" />
            </p>
            <p>
              <em>
                If you like this and would like to support expanding upon it,
                I’d really appreciate some support over at{' '}
                <Link
                  href="https://www.buymeacoffee.com/padraig"
                  text="buymeacoffee"
                />
              </em>
            </p>
            <hr />
            {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
            <marquee>
              Other Projects:{' '}
              <Link
                href="https://packard-belle.netlify.com"
                text="W98 recreation"
              />
              ,{' '}
              <Link
                href="https://packard-belle.netlify.com"
                text="
                Component Library"
              />
              ,{' '}
              <Link
                href="https://www.npmjs.com/package/subtitles-ssa"
                text="Subtitles parser"
              />
              , other half baked things I haven‘t finished yet
            </marquee>
          </div>
        }
      >
        CourseBuilder
        <div className={viewButtonStyle}>
          {keys.map(k => (
            <ViewOption
              key={k}
              value={k}
              update={updateActive}
              active={active}
            />
          ))}
        </div>
      </Heading>
      <div className={bodyStyle}>
        <Playlist isActive={active === 'playlist'} />
        <VideoPlayer maxWidth="80%" isActive={active === 'video'} />
        <Notes isActive={active === 'notes'} />
      </div>
    </CourseProvider>
  );
};

export default App;

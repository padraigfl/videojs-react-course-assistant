import React from 'react';
import { styled } from 'linaria/react';

import CourseContext from '../../context';
import { colors, spacings } from '../../constants/styles';
import { formatTime } from '../../helpers';

const NoteWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${spacings.s}px;
  background-color: ${colors.brand};
  margin-top: auto;
`;
const TextArea = styled('textarea')`
  height: 100px;
  background-color: ${colors.accent};
`;
const NoteActions = styled('div')`
  display: flex;
`;

const Notetaker = props => {
  const context = React.useContext(CourseContext);
  const propNote = props.note || {};
  const [text, updateNote] = React.useState(propNote.text);
  const [time, updateTime] = React.useState(propNote.time);
  const [video, updateVideo] = React.useState(propNote.video);
  debugger;
  return (
    <NoteWrapper>
      <TextArea
        onFocus={() => {
          if (!time) {
            updateTime(context.video.currentTime());
            updateVideo(context.currentlyPlaying.video);
          }
        }}
        onChange={e => updateNote(e.target.value)}
        value={text}
      />

      {typeof video === 'number' && typeof time !== 'undefined' ? (
        <div>
          Video: {context.playlist.items[video - 1]} | Time: {formatTime(time)}
        </div>
      ) : null}
      <NoteActions>
        <button
          type="button"
          onClick={() => {
            updateVideo(context.currentlyPlaying.video);
            updateTime(context.video.currentTime());
          }}
        >
          Set Current Time
        </button>
        <button
          type="button"
          onClick={() => {
            context.alterNotes.add({
              time,
              text,
              video
            });
            updateTime(null);
          }}
        >
          {props.note ? 'Update' : 'Save'}
        </button>
      </NoteActions>
    </NoteWrapper>
  );
};

Notetaker.defaultProps = {
  noteStart: 0
};

export default Notetaker;

import React from 'react';
import { styled } from 'linaria/react';

import { colors, spacings } from '../../constants/styles';

const NoteWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${spacings.s}px;
  margin-top: auto;
`;
const TextArea = styled('textarea')`
  height: 150px;
  background-color: ${colors.accent};
`;
const NoteActions = styled('div')`
  display: flex;
`;

const Notetaker = props => {
  const existingText = props.note && props.note.text;
  const [text, updateNote] = React.useState(existingText || '');
  const [time, updateTime] = React.useState(props.noteStart);
  const [video, setVideo] = React.useState(props.video);
  return (
    <NoteWrapper>
      <TextArea onChange={e => updateNote(e.target.value)} value={text} />
      <NoteActions>
        <div>
          {video} | {time}
        </div>
        <button
          type="button"
          onClick={() => {
            setVideo(props.video);
            updateTime(props.currentTime());
          }}
        >
          Current Time
        </button>
        <button
          type="button"
          onClick={() => {
            props.noteFunctions.add({
              time: props.time,
              text,
              video
            });
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

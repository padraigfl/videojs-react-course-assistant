import React from 'react';
import { styled } from 'linaria/react';

import CourseContext from '../../context';
import { colors, spacings } from '../../constants/styles';

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
  flex-grow: 1;
`;
const NoteForm = styled('div')`
  display: flex;
`;
const NoteActions = styled('div')`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  button {
    flex-grow: 1;
  }
`;

const Notetaker = props => {
  const context = React.useContext(CourseContext);
  const textEl = React.useRef();
  const propNote = props.note || {};
  const [text, updateNote] = React.useState(propNote.text);
  const [time, updateTime] = React.useState(propNote.time || 0);
  const [video, updateVideo] = React.useState(propNote.video || 0);

  const submitNote = e => {
    if (e.type === 'click' || (!e.shiftKey && e.which === 13)) {
      e.preventDefault();
      context.alterNotes.add(
        {
          time,
          text
        },
        context.playlist.order[video]
      );
      updateTime(null);
      updateNote('');
      textEl.current.blur();
    }
  };

  return (
    <NoteWrapper>
      <NoteForm>
        <TextArea
          onFocus={() => {
            if (!text) {
              updateTime(context.video.currentTime());
              updateVideo(context.currentlyPlaying.video);
            }
          }}
          ref={textEl}
          onKeyPress={submitNote}
          onChange={e => updateNote(e.target.value)}
          value={text}
        />
        <NoteActions>
          <button
            type="button"
            onClick={() =>
              context.alterNotes.add(
                {
                  time: context.video.currentTime()
                },
                context.playlist.order[context.currentlyPlaying.video]
              )
            }
            disabled={!context.video}
          >
            Bookmark
          </button>
          <button
            type="button"
            onClick={() => {
              updateVideo(context.currentlyPlaying.video);
              updateTime(context.video.currentTime());
            }}
            disabled={!text || text === ''}
          >
            Update Timestamp
          </button>
          <button
            type="button"
            disabled={!text || text === ''}
            onClick={submitNote}
          >
            Add Note
          </button>
        </NoteActions>
      </NoteForm>
    </NoteWrapper>
  );
};

Notetaker.defaultProps = {
  noteStart: 0
};

export default Notetaker;

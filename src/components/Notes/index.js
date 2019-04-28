import React from 'react';
import { styled } from 'linaria/react';
import CourseContext from '../../context';
import Notetaker from './Notetaker';

const Wrapper = styled('div')``;
const Note = styled('div')``;

const Notes = () => {
  const context = React.useContext(CourseContext);
  const [activeNote, selectNote] = React.useState();
  const [startTime, setStartTime] = React.useState(null);

  return (
    <Wrapper>
      {context.notes.map(note => (
        <Note onClick={() => selectNote(note)}>{JSON.stringify(note)}</Note>
      ))}
      {startTime && (
        <Notetaker
          note={activeNote}
          noteFunctions={context.alterNotes}
          noteStart={startTime}
        />
      )}
      <button
        type="button"
        onClick={() => {
          debugger;
          setStartTime(context.video.currentTime());
        }}
      >
        New Note
      </button>
      <button type="button" onClick={context.alterNotes.add}>
        Bookmark
      </button>
    </Wrapper>
  );
};

export default Notes;

import React from 'react';
import CourseContext from '../../context';
import Notetaker from './Notetaker';

import { ListWrapper, ListEntry } from '../styledShared';

const Notes = () => {
  const context = React.useContext(CourseContext);
  const [activeNote, selectNote] = React.useState();
  const [startTime, setStartTime] = React.useState(null);

  return (
    <ListWrapper>
      {context.notes.map(note => (
        <ListEntry onClick={() => selectNote(note)}>
          {JSON.stringify(note)}
        </ListEntry>
      ))}
      {(startTime || startTime === 0) && (
        <Notetaker
          note={activeNote}
          noteFunctions={context.alterNotes}
          noteStart={startTime}
        />
      )}
      <button
        type="button"
        onClick={() => {
          setStartTime(context.video.currentTime());
        }}
      >
        New Note
      </button>
      <button type="button" onClick={context.alterNotes.add}>
        Bookmark
      </button>
    </ListWrapper>
  );
};

export default Notes;

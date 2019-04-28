import React from 'react';
import { styled } from 'linaria/react';

const Notes = styled('div')``;

const Notetaker = props => {
  const existingNote = props.note && props.note.text;
  const [note, updateNote] = React.useState(existingNote || '');

  return (
    <Notes>
      <textarea onChange={updateNote} value={note} />
      {}
      {existingNote ? (
        <button type="button" onClick={props.noteFunctions.add}>
          Update
        </button>
      ) : (
        <>
          <input type="text" value={props.noteStart} disabled />
          <button
            type="button"
            onClick={
              props.note ? props.noteFunctions.edit : props.noteFunctions.add
            }
          >
            Save
          </button>
        </>
      )}
    </Notes>
  );
};

export default Notetaker;

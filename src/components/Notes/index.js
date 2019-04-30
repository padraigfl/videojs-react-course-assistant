import React from 'react';
import { css, cx } from 'linaria';
import { styled } from 'linaria/react';
import CourseContexts from '../../context';
import Notetaker from './Notetaker';
import { colors, spacings } from '../../constants/styles';

import { ListWrapper, ListEntry, Heading } from '../styledShared';

const List = styled('div')`
  background-color: ${colors.accent};
  overflow: scroll;
`;

const main = css`
  display: flex;
  flex-direction: column;
`;

const Notes = () => {
  const context = React.useContext(CourseContexts);
  const [activeNote, selectNote] = React.useState();
  const [startTime, setStartTime] = React.useState(null);

  return (
    <ListWrapper className={cx('Notes Column', main)}>
      <Heading>Notes &amp; Bookmarks</Heading>
      <List>
        {context.notes.map(note => (
          <ListEntry onClick={() => selectNote(note)}>
            {JSON.stringify(note)}
          </ListEntry>
        ))}
      </List>
      <div style={{ marginTop: 'auto' }}>
        <div>
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
        </div>
        {(startTime || startTime === 0) && (
          <Notetaker
            note={activeNote}
            noteStart={startTime}
            saveFunction={
              activeNote ? context.alterNotes.edit : context.alterNotes.add
            }
            video={context.currentlyPlaying.number}
          />
        )}
      </div>
    </ListWrapper>
  );
};

export default Notes;

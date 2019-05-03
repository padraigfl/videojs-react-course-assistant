import React from 'react';
import { css, cx } from 'linaria';
import { styled } from 'linaria/react';
import CourseContext from '../../context';
import Notetaker from './Notetaker';
import { colors, spacings } from '../../constants/styles';

import { ListWrapper, List, ListEntry, Heading } from '../styledShared';
import { formatTime } from '../../helpers';

const main = css`
  display: flex;
  flex-direction: column;
`;

const Notes = () => {
  const context = React.useContext(CourseContext);
  const [activeNote, selectNote] = React.useState();
  const [startTime, setStartTime] = React.useState(null);

  return (
    <ListWrapper className={cx('Notes Column', main)}>
      <Heading>Notes &amp; Bookmarks</Heading>
      <List>
        {context.playlist.order.map(vidId =>
          (context.notes[vidId] || []).map((note, idx) => (
            <ListEntry
              key={`${note.text}${note.time}`}
              onClick={() => selectNote(note)}
            >
              <div>
                <a
                  href={`https://youtu.be/${vidId}?t=${Math.floor(note.time)}`}
                  onClick={e => {
                    e.preventDefault();
                    context.setTrack(
                      context.playlist.order.findIndex(x => x === vidId),
                      note.time
                    );
                  }}
                >
                  {context.playlist.items[vidId].title} |{' '}
                  {formatTime(note.time)}
                </a>
                {note.text && <div>{note.text}</div>}
                <button
                  type="button"
                  onClick={() => context.alterNotes.delete(vidId, idx)}
                >
                  Delete
                </button>
              </div>
            </ListEntry>
          ))
        )}
      </List>
      <div style={{ marginTop: 'auto' }}>
        <Notetaker
          note={activeNote}
          // saveFunction={
          //   activeNote ? context.alterNotes.edit : context.alterNotes.add
          // }
          // currentTrack={context.currentlyPlaying}
        />
      </div>
    </ListWrapper>
  );
};

export default Notes;

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
        {context.notes.map(note => (
          <ListEntry
            key={`${note.text}${note.time}`}
            onClick={() => selectNote(note)}
          >
            <div>
              <a
                href={`https://youtu.be/${
                  context.playlist.items[note.video].videoId
                }?t=${Math.floor(note.time)}`}
                onClick={e => {
                  e.preventDefault();
                  context.setTrack(note.video);
                }}
              >
                {context.playlist.items[note.video].title} |{' '}
                {formatTime(note.time)}
              </a>
              {note.text && <div>{note.text}</div>}
            </div>
          </ListEntry>
        ))}
      </List>
      <div style={{ marginTop: 'auto' }}>
        <Notetaker
          note={activeNote}
          // saveFunction={
          //   activeNote ? context.alterNotes.edit : context.alterNotes.add
          // }
          // currentTrack={context.currentlyPlaying}
        />
        <button
          type="button"
          onClick={() =>
            context.alterNotes.add({
              time: context.video.currentTime(),
              video: context.currentlyPlaying.video
            })
          }
          disabled={!context.video || !context.video.currentTime()}
        >
          Bookmark
        </button>
      </div>
    </ListWrapper>
  );
};

export default Notes;

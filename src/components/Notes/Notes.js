import React from 'react';
import { css, cx } from 'linaria';
import CourseContext from '../../context';
import Notetaker from './Notetaker';
import downloadIcon from '../../assets/download.svg';

import {
  ListSection,
  List,
  ListEntry,
  EllipsisTextLine,
  CancelButton
} from '../styledShared';
import { formatTime } from '../../helpers';
import Heading from '../Heading/Heading';

const main = css`
  display: flex;
  flex-direction: column;
`;

const downloadNotes = (notes, playlist) => {
  const a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(
    new Blob(
      [
        JSON.stringify({
          playlist: playlist.id,
          notes: playlist.order.map(v => ({
            track: playlist.items[v].title,
            notes: notes[v]
          }))
        })
      ],
      { type: 'text/json' }
    )
  );

  // Use download attribute to set set desired file name
  a.setAttribute('download', `Notes_${playlist.id}`);

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
};

const Notes = props => {
  const context = React.useContext(CourseContext);
  const [activeNote, selectNote] = React.useState();

  const dlNotes = () => downloadNotes(context.notes, context.playlist);

  return (
    <ListSection
      className={cx(
        `Notes Column  ${props.isActive ? 'Column--selected' : ''}`,
        main
      )}
    >
      <Heading
        settingsView={
          <div>
            <button type="button" onClick={dlNotes}>
              Download JSON of notes <img src={downloadIcon} alt="download" />
            </button>
          </div>
        }
        icon={<img src={downloadIcon} alt="download" />}
        level={2}
      >
        <EllipsisTextLine>Notes &amp; Bookmarks</EllipsisTextLine>
      </Heading>
      <List>
        {context.playlist.order.map(vidId =>
          (context.notes[vidId] || []).map((note, idx) => (
            <ListEntry
              key={note.id || `${note.text}${note.time}`}
              onClick={() => selectNote(note)}
            >
              <div>
                <a
                  style={{ paddingRight: '24px' }}
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
                <CancelButton
                  type="button"
                  onClick={() => context.alterNotes.delete(vidId, idx)}
                >
                  X
                </CancelButton>
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
    </ListSection>
  );
};

export default Notes;

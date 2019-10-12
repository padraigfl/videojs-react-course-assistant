import React from 'react';
import { styled } from 'linaria/react';
import { spacings, colors } from '../../constants/styles';
import { formatTime, ytTimeToSeconds } from '../../helpers';
import {
  fetchPlaylistItems,
  fetchVideoDetails,
  fetchPlaylist
} from '../../api/youtube';

import { ListSection, ListEntry, List } from '../styledShared';
import CourseContext from '../../context';
import Heading from '../Heading/Heading';

if (!process.env.YOUTUBE_API_KEY) {
  console.error('DOTENV-FAILURE');
}

// const formatVideoResponse = resp => ({
//   items: resp.items.map(item => ({
//     ...item.contentDetails
//   }))
// });

const formatPlaylistResponse = (resp, id, playlistInfo = {}) => ({
  total: resp.pageInfo.totalResults,
  items: resp.items.reduce(
    (acc, { snippet }) => ({
      ...acc,
      [snippet.resourceId.videoId]: {
        videoId: snippet.resourceId.videoId,
        thumbnail: snippet.thumbnails.default,
        posterImage: snippet.thumbnails.high.url,
        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle,
        title: snippet.title,
        description: snippet.description
      }
    }),
    {}
  ),
  id,
  ...playlistInfo,
  order: resp.items.map(({ snippet }) => snippet.resourceId.videoId)
});

const getNewPlaylist = (
  playlistId,
  setPlaylist,
  youtubeKey = process.env.YOUTUBE_API_KEY
) =>
  fetchPlaylist(playlistId, youtubeKey)
    .then(({ items }) => {
      if (items.length === 0) {
        alert('Fetched playlist is empty');
        return;
      }
      const { snippet } = items[0];
      fetchPlaylistItems(playlistId, youtubeKey).then(result => {
        const formattedResult = formatPlaylistResponse(
          result,
          playlistId,
          snippet
        );
        return fetchVideoDetails(formattedResult.order.join(','), youtubeKey)
          .then(vidDetails => {
            vidDetails.items.forEach(item => {
              formattedResult.items[item.id] = {
                ...formattedResult.items[item.id],
                ...item.contentDetails,
                duration: ytTimeToSeconds(item.contentDetails.duration)
              };
            });
            setPlaylist(formattedResult);
          })
          .catch(error => {
            console.error(error);
            setPlaylist(result);
          });
      });
    })
    .catch(error => {
      console.error(error);
    });

const getPlaylist = (
  playlistUrl,
  getSavedPlaylist,
  setPlaylist,
  youtubeKey
) => {
  const playlistId = playlistUrl.replace(/.*list=/, '').replace(/&.*/, '');
  const playlist = getSavedPlaylist();
  if (playlist) {
    return;
  }
  getNewPlaylist(playlistId, setPlaylist, youtubeKey);
};

const Thumbnail = styled('div')`
  height: 45px;
  width: 45px;
  background-size: cover;
  background-position: ${spacings.s}px;
  flex-shrink: 0;
  margin-right: ${spacings.xs}px;
`;

const Form = styled(`div`)`
  margin: ${spacings.xs}px 0px ${spacings.s}px;
`;

const ChangePlaylist = styled('div')`
  color: ${colors.dark2};
  font-size: 1rem;
`;

const Playlist = props => {
  const context = React.useContext(CourseContext);

  const [playlistId, updatePlaylistId] = React.useState(
    context.playlist.id || ''
  );

  const updatePlaylist = () =>
    getPlaylist(playlistId, context.getSavedPlaylist, context.setNewPlaylist);
  return (
    <ListSection
      className={`Playlist Column ${props.isActive ? 'Column--selected' : ''}`}
    >
      <Heading
        icon={<ChangePlaylist>Change</ChangePlaylist>}
        settingsView={
          <>
            <Form>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updatePlaylist();
                }}
              >
                <h4>Add New Playlist</h4>
                <input
                  onChange={e => updatePlaylistId(e.target.value)}
                  value={playlistId}
                  placeholder="Playlist Id"
                />
                <button type="submit">Fetch playlist</button>
              </form>
            </Form>
            <Form>
              <h4>Select Existing Playlist</h4>
              <p>
                <em>Dont worry, your existing notes should be saved</em>
              </p>
              <select
                onChange={e => {
                  e.preventDefault();
                  context.getSavedPlaylist(e.target.value);
                }}
              >
                <option value="" disabled selected>
                  Select saved playlist
                </option>
                {Object.keys(context.savedPlaylists).map(v => (
                  <option key={v} value={v}>
                    {context.savedPlaylists[v].title}
                  </option>
                ))}
              </select>
            </Form>
          </>
        }
        level={2}
      >
        Playlist
      </Heading>
      {context.playlist.title && <div>{context.playlist.title}</div>}
      <List>
        {context.playlist &&
          context.playlist.order.map((vidKey, idx) => {
            const {
              title,
              thumbnail,
              videoId,
              duration
            } = context.playlist.items[vidKey];
            return (
              <ListEntry key={videoId}>
                <Thumbnail
                  style={{ backgroundImage: `url('${thumbnail.url}')` }}
                />
                <div>
                  <a
                    href={`https://youtu.be/${videoId}`}
                    onClick={e => {
                      e.preventDefault();
                      context.setTrack(idx);
                    }}
                  >
                    {title}
                  </a>
                  {formatTime(duration)}
                </div>
              </ListEntry>
            );
          })}
      </List>
    </ListSection>
  );
};

export default Playlist;

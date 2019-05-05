import React from 'react';
import { styled } from 'linaria/react';
import { spacings } from '../../constants/styles';
import { formatTime, ytTimeToSeconds } from '../../helpers';
import { fetchPlaylistItems, fetchVideoDetails } from '../../api/youtube';

import { ListWrapper, ListEntry, List } from '../styledShared';
import CourseContext from '../../context';
import Heading from '../Heading/Heading';

if (!process.env.YOUTUBE_API_KEY) {
  console.error('DOTENV-FAILURE');
} else {
  console.log('dotenv success');
}

// const formatVideoResponse = resp => ({
//   items: resp.items.map(item => ({
//     ...item.contentDetails
//   }))
// });

const formatPlaylistResponse = (resp, id) => ({
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
  order: resp.items.map(({ snippet }) => snippet.resourceId.videoId)
});

const getNewPlaylist = (playlistId, setPlaylist, youtubeKey) =>
  fetchPlaylistItems(playlistId, youtubeKey)
    .then(result => {
      const formattedResult = formatPlaylistResponse(result, playlistId);
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
    console.error('no playlist to be found');
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

const Playlist = props => {
  const context = React.useContext(CourseContext);

  const [playlistId, updatePlaylistId] = React.useState(
    context.playlist.id || ''
  );
  const [youtubeKey, updateAPIKey] = React.useState(
    process.env.YOUTUBE_API_KEY || ''
  );

  const updatePlaylist = () =>
    getPlaylist(
      playlistId,
      context.getSavedPlaylist,
      context.setNewPlaylist,
      youtubeKey
    );
  return (
    <ListWrapper
      className={`Playlist Column ${props.isActive ? 'Column--selected' : ''}`}
    >
      <Heading
        settingsView={
          <form
            onSubmit={e => {
              e.preventDefault();
              updatePlaylist();
            }}
          >
            <div>
              <input
                onChange={e => updatePlaylistId(e.target.value)}
                value={playlistId}
                placeholder="Playlist Id"
              />
            </div>
            <div>
              <input
                onChange={e => updateAPIKey(e.target.value)}
                value={youtubeKey}
                placeholder="Youtube API Key"
              />
            </div>
            <button type="submit">Fetch playlist</button>
          </form>
        }
      >
        Playlist
      </Heading>
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
    </ListWrapper>
  );
};

export default Playlist;

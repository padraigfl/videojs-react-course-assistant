import React from 'react';
import { styled } from 'linaria/react';
import { spacings } from '../../constants/styles';
import { formatTime, ytTimeToSeconds } from '../../helpers';
import { fetchPlaylistItems, fetchVideoDetails } from '../../api/youtube';

import { ListWrapper, ListEntry, Heading, List } from '../styledShared';
import CourseContext from '../../context';

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

const formatPlaylistResponse = resp => ({
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
  order: resp.items.map(({ snippet }) => snippet.resourceId.videoId)
});

const getNewPlaylist = (playlistId, setPlaylist) =>
  fetchPlaylistItems(playlistId)
    .then(result => {
      const formattedResult = formatPlaylistResponse(result);
      return fetchVideoDetails(formattedResult.order.join(','))
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

const getPlaylist = (playlistId, getSavedPlaylist, setPlaylist) => {
  const playlist = getSavedPlaylist(playlistId);
  if (playlist) {
    return;
  }
  getNewPlaylist(playlistId, setPlaylist);
};

const Thumbnail = styled('div')`
  height: 45px;
  width: 45px;
  background-size: cover;
  background-position: ${spacings.s}px;
  flex-shrink: 0;
  margin-right: ${spacings.xs}px;
`;

const App = () => {
  const context = React.useContext(CourseContext);

  const [playlistId, updatePlaylistId] = React.useState(
    'PLZz6paDarXRlHVK272ZhQI78tQOhvljv8'
  );

  const updatePlaylist = () =>
    getPlaylist(playlistId, context.getSavedPlaylist, context.setNewPlaylist);
  return (
    <ListWrapper className="Playlist Column">
      <Heading>Playlist</Heading>
      <input
        onChange={e => updatePlaylistId(e.target.value)}
        value={playlistId}
      />
      <button type="button" onClick={updatePlaylist}>
        Fetch playlist
      </button>
      <List>
        {context.playlist &&
          context.playlist.order.map((vidKey, idx) => {
            const {
              title,
              description,
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
                  {description && (
                    <div>
                      {description.slice(0, 20)} {formatTime(duration)}
                    </div>
                  )}
                </div>
              </ListEntry>
            );
          })}
      </List>
    </ListWrapper>
  );
};

export default App;

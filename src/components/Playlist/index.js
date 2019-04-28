import React from 'react';
import { styled } from 'linaria/react';
import { colors, spacings } from '../../constants/styles';
import dummyPlaylist from '../../constants/dummy';

import { fetchPlaylistItems, fetchVideoDetails } from '../../api/youtube';

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
  items: resp.items.map(({ snippet }) => ({
    videoId: snippet.resourceId.videoId,
    thumbnail: snippet.thumbnails.default,
    channelId: snippet.channelId,
    channelTitle: snippet.channelTitle,
    title: snippet.title,
    description: snippet.description
  }))
});

const getPlaylist = (updateState, playlistId) => {
  fetchPlaylistItems(playlistId)
    .then(result => {
      debugger;
      const formattedResult = formatPlaylistResponse(result);
      return fetchVideoDetails(
        formattedResult.items.map(i => i.videoId).join(',')
      )
        .then(vidDetails => {
          const expandedItems = formattedResult.items.map((item, idx) => ({
            ...item,
            ...vidDetails.items[idx].contentDetails
          }));
          const formattedPlaylistInfo = {
            ...formattedResult,
            items: expandedItems
          };
          debugger;
          updateState(formattedPlaylistInfo);
        })
        .catch(error => {
          console.log(error);
          updateState(result);
        });
    })
    .catch(error => {
      console.error(error);
    });
};

const PlaylistWrapper = styled('div')`
  max-width: 350px;
  width: 30%;
  min-width: 250px;
  height: 100%;
  overflow-y: scroll;
  background-color: #${colors.light};
`;

const PlaylistEntry = styled('div')`
  display: flex;
  max-height: 100px;
  margin: ${spacings.xs}px;
  margin-top: ${spacings.s}px;
  overflow: hidden;
  a {
    display: block;
    color: #${colors.brand};
    font-weight: bold;
    &:hover {
      color: #${colors.accent};
    }
  }
`;

const Thumbnail = styled('div')`
  height: 45px;
  width: 45px;
  background-size: cover;
  background-position: ${spacings.s}px;
  flex-shrink: 0;
  margin-right: ${spacings.xs}px;
`;

const App = () => {
  const [playlist, setPlaylist] = React.useState(dummyPlaylist);
  const [playlistId, updatePlaylistId] = React.useState(
    'PLZz6paDarXRlHVK272ZhQI78tQOhvljv8'
  );
  const updatePlaylist = () => getPlaylist(setPlaylist, playlistId);
  console.log(playlist);
  return (
    <PlaylistWrapper>
      <input onChange={updatePlaylistId} value={playlistId} />
      <button type="button" onClick={updatePlaylist}>
        Play
      </button>
      {playlist &&
        playlist.items.map(
          ({ title, description, thumbnail, videoId, duration }) => (
            <PlaylistEntry>
              <Thumbnail
                style={{ backgroundImage: `url('${thumbnail.url}')` }}
              />
              <div>
                <a href={`https://youtu.be/${videoId}`}>{title}</a>
                {description && (
                  <div>
                    {description.slice(0, 20)} {duration}
                  </div>
                )}
              </div>
            </PlaylistEntry>
          )
        )}
    </PlaylistWrapper>
  );
};

export default App;

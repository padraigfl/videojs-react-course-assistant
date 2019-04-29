import React from 'react';
import { styled } from 'linaria/react';
import { spacings } from '../../constants/styles';
import dummyPlaylist from '../../constants/dummy';
import { fetchPlaylistItems, fetchVideoDetails } from '../../api/youtube';

import { ListWrapper, ListEntry } from '../styledShared';
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
  items: resp.items.map(({ snippet }) => ({
    videoId: snippet.resourceId.videoId,
    thumbnail: snippet.thumbnails.default,
    channelId: snippet.channelId,
    channelTitle: snippet.channelTitle,
    title: snippet.title,
    description: snippet.description
  }))
});

const getNewPlaylist = (playlistId, setPlaylist) =>
  fetchPlaylistItems(playlistId)
    .then(result => {
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
          setPlaylist(formattedPlaylistInfo);
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
    <ListWrapper>
      <input
        onChange={e => updatePlaylistId(e.target.value)}
        value={playlistId}
      />
      <button type="button" onClick={updatePlaylist}>
        Play
      </button>
      {context.playlist &&
        context.playlist.items.map(
          ({ title, description, thumbnail, videoId, duration }, idx) => (
            <ListEntry>
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
                    {description.slice(0, 20)} {duration}
                  </div>
                )}
              </div>
            </ListEntry>
          )
        )}
    </ListWrapper>
  );
};

export default App;

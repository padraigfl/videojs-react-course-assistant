import React from 'react';
import PlaylistFetcher from 'youtube-playlist-summary';

import { fetchPlaylistItems } from '../../api/youtube';

if (!process.env.YOUTUBE_API_KEY) {
  console.error('DOTENV-FAILURE');
} else {
  console.log('dotenv success');
}

const pf = new PlaylistFetcher({
  GOOGLE_API_KEY: process.env.YOUTUBE_API_KEY
});

// const getPlaylist = (updateState, playlistId) => {
//   pf.getPlaylistItems(playlistId)
//     .then(result => {
//       updateState(result);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };

const getPlaylist = (updateState, playlistId) => {
  fetchPlaylistItems(playlistId)
    .then(result => {
      debugger;
      updateState(result);
    })
    .catch(error => {
      console.error(error);
    });
};

const App = () => {
  const [playlist, setPlaylist] = React.useState();
  const [playlistId, updatePlaylistId] = React.useState(
    'PLZz6paDarXRlHVK272ZhQI78tQOhvljv8'
  );
  const updatePlaylist = () => getPlaylist(setPlaylist, playlistId);
  console.log(playlist);
  return (
    <div>
      <input onChange={updatePlaylistId} value={playlistId} />
      <button type="button" onClick={updatePlaylist}>
        Play
      </button>
      {playlist &&
        JSON.stringify(
          playlist.items.map(item => {
            const {
              snippet: {
                title,
                description,
                thumbnails: { default: thumbnail }
              },
              contentDetails: { videoId }
            } = item;
            debugger;
            return {
              title,
              videoId,
              thumbnail,
              description: description ? description.slice(0, 20) : null
            };
          })
        )}
    </div>
  );
};

export default App;

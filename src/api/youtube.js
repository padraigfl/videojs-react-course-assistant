const fetchYoutubeApiCore = req =>
  window
    .fetch(
      `https://www.googleapis.com/youtube/v3/${req}&key=${
        process.env.YOUTUBE_API_KEY
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => res.json());

export const fetchPlaylist = id =>
  fetchYoutubeApiCore(`playlists?id=${id}&part=snippet`);

export const fetchPlaylistItems = id =>
  fetchYoutubeApiCore(
    `playlistItems?playlistId=${id}&part=snippet,contentDetails&maxResults=50`
  );

export const fetchVideoDetails = idList =>
  fetchYoutubeApiCore(`videos?part=contentDetails&id=${idList}`);

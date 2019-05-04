const fetchYoutubeApiCore = (req, youtubeKey) =>
  window
    .fetch(
      `https://www.googleapis.com/youtube/v3/${req}&key=${process.env
        .YOUTUBE_API_KEY || youtubeKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => res.json());

export const fetchPlaylist = (id, youtubeKey) => {
  const x = fetchYoutubeApiCore(`playlists?id=${id}&part=snippet`, youtubeKey);
  return x;
};

export const fetchPlaylistItems = (id, youtubeKey) =>
  fetchYoutubeApiCore(
    `playlistItems?playlistId=${id}&part=snippet,contentDetails&maxResults=50`,
    youtubeKey
  );

export const fetchVideoDetails = (idList, youtubeKey) =>
  fetchYoutubeApiCore(`videos?part=contentDetails&id=${idList}`, youtubeKey);

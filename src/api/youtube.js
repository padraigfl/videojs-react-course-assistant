export const fetchPlaylist = id =>
  window
    .fetch(
      `https://www.googleapis.com/youtube/v3/playlists?id=${id}&key=${
        process.env.YOUTUBE_API_KEY
      }&part=snippet,contentDetails`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => res.json());
export const fetchPlaylistItems = id =>
  window
    .fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${id}&part=snippet,contentDetails&key=${
        process.env.YOUTUBE_API_KEY
      }&maxResults=50`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => res.json());

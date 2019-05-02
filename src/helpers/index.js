const SECONDS_IN_AN_HOUR = 60 * 60;

const doubleDigit = val => (val < 10 ? `0${val}` : val);

export const formatTime = (seconds, videoNo) => {
  const hrs = Math.floor(seconds / SECONDS_IN_AN_HOUR) || '';
  const mins = Math.floor((seconds % SECONDS_IN_AN_HOUR) / 60);
  const secs = Math.ceil(seconds % 60);
  return `${typeof videoNo !== 'undefined' ? videoNo : ''}${
    hrs ? `${hrs}:` : ''
  }${doubleDigit(mins)}:${doubleDigit(secs)}`;
};

export const getVideoDetails = (searchId, playlist) =>
  playlist.find(({ id }) => id === searchId);

export const ytTimeToSeconds = ytTime =>
  ytTime
    .split(/[A-Z]+/)
    .filter(x => x)
    .reverse()
    .reduce((acc, val, idx) => acc + val * 60 ** idx, 0);

import React, { Component, createContext } from 'react';

import dummyPlaylist from '../constants/dummy';

export const Context = createContext();

const insertAtIdx = (list, idx, entry) => [
  ...list.slice(0, idx),
  entry,
  ...list.slice(idx, list.length)
];

const replaceAtIdx = (list, idx, entry) => [
  ...list.slice(0, idx),
  entry,
  ...list.slice(idx + 1, list.length)
];

export class CourseProvider extends Component {
  static defaultProps = {
    playlist: dummyPlaylist, // @todo remove
    notes: [
      { time: 10, video: 1, text: 'sfasdfas' },
      { time: 100, video: 1, text: 'sfasdfas' },
      { time: 1000, video: 2, text: 'sfasdfas' },
      { time: 1000, video: 5, text: 'sfasdfas' },
      { time: 1002, video: 8, text: 'sfasdfas' },
      { time: 10, video: 1, text: 'sfasdfas' },
      { time: 100, video: 1, text: 'sfasdfas' },
      { time: 1000, video: 2, text: 'sfasdfas' },
      { time: 1000, video: 5, text: 'sfasdfas' },
      { time: 1002, video: 8, text: 'sfasdfas' },
      { time: 10, video: 1, text: 'sfasdfas' },
      { time: 100, video: 1, text: 'sfasdfas' },
      { time: 1000, video: 2, text: 'sfasdfas' },
      { time: 1000, video: 5, text: 'sfasdfas' },
      { time: 1002, video: 8, text: 'sfasdfas' }
    ]
  };

  state = {
    availableData: [], // list of playlists in localStorage
    playlist: this.props.playlist,
    notes: this.props.notes,
    // bookmarks: [], bookmarks = notes with just a timestamp
    currentlyPlaying: {
      video: 0,
      position: 0
    },
    video: null
  };

  componentDidMount() {
    // check local storage
  }

  // checks if playlist is on local storage and pulls data from there
  getSavedPlaylist = playlistId => {
    const playlist = window.localStorage.getItem(`playlist__${playlistId}`);
    if (!playlist) {
      return null;
    }
    const formatted = JSON.parse(playlist);
    // @todo: validate
    this.setState(formatted);
    return formatted;
  };

  saveData = () => {
    window.localStorage.setItem(
      [`playlist__${this.state.playlist.id}`],
      JSON.stringify({
        playlist: this.state.playlist,
        notes: this.state.notes,
        currentlyPlaying: this.state.currentlyPlaying
      })
    );
  };

  setNewPlaylist = playlist => {
    this.setState(
      {
        playlist,
        notes: []
      },
      this.saveData
    );
  };

  alterFields = key => ({
    add: ({ text, time, video }) => {
      const insertionIndex = this.state[key].findIndex(
        note => note.video > video || (note.video === video && note.time < time)
      );
      this.setState(
        state => ({
          [key]: insertAtIdx(state[key], insertionIndex, { text, time, video })
        }),
        this.saveData
      );
    },
    edit: (note, idx) =>
      idx < this.state[key].length &&
      this.setState(
        state => ({
          [key]: replaceAtIdx(state[key], idx, note)
        }),
        this.saveData
      ),
    delete: idx =>
      this.setState(
        state => ({
          [key]: [
            ...state[key].slice(0, idx),
            ...state[key].slice(idx + 1, state[key].length)
          ]
        }),
        this.saveData
      )
  });

  alterNotes = this.alterFields('notes');

  getSrc = idx => {
    const entry =
      Array.isArray(this.state.playlist.items) &&
      this.state.playlist.items[idx];
    if (entry) {
      return `https://youtu.be/${entry.videoId}`;
    }
    return '';
  };

  setTrack = (number, position = 0) => {
    const source = this.getSrc(number);
    this.state.video.src({
      type: 'video/youtube',
      src: source
    });
    // @todo update thumbnail
    this.state.video.play();
    this.setState({ currentlyPlaying: { number, position } });
  };

  // @todo timer before autoplay
  nextTrack = () => this.setTrack(this.state.currentlyPlaying.number + 1);

  setVideo = vid => {
    // initialize
    vid.on('ended', this.nextTrack);

    this.setState({ video: vid });
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          getSavedPlaylist: this.getSavedPlaylist,
          setNewPlaylist: this.setNewPlaylist,
          setVideo: this.setVideo,
          setTrack: this.setTrack,
          alterNotes: this.alterNotes
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;

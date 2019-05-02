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
      // { time: 10, video: 0, text: 'sdfasdfas' },
      // { time: 100, video: 1, text: 'sfasdftfas' },
      // { time: 105, video: 2, text: 'sfasfgjtdfas' },
      // { time: 120, video: 3, text: 'sfawqrgrsdfas' },
      // { time: 102, video: 4, text: 'sfsewasdfas' },
      // { time: 10, video: 5, text: 'sfasdfas' },
      // { time: 100, video: 5, text: 'sfaservadrsfas' },
      // { time: 14, video: 6, text: 'sfasafadfas' },
      // { time: 23, video: 6, text: 'sfasfdfas' },
      // { time: 12, video: 7, text: 'sfasederwfas' },
      // { time: 10, video: 8, text: 'sfasdfewrdsfas' },
      // { time: 40, video: 8, text: 'sfashtrdfas' },
      // { time: 60, video: 8, text: 'sfaftsdfas' },
      // { time: 29, video: 9, text: 'sfasfdersdfas' },
      // { time: 130, video: 9, text: 'sfawersdfas' }
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
      debugger;
      const arrayLength =
        Array.isArray(this.state[key]) && this.state[key].length;
      // @todo tidyup
      const insertionIndex =
        arrayLength > 0
          ? this.state[key].findIndex(
              (note, idx) =>
                (note.video === video && note.time > time) ||
                (arrayLength > idx - 1 && this.state[key][idx].video > video)
            ) || arrayLength
          : 0;
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

  setTrack = (video, position = 0) => {
    const source = this.getSrc(video);
    this.state.video.src({
      type: 'video/youtube',
      src: source
    });
    // @todo update thumbnail
    this.state.video.play();
    this.setState({ currentlyPlaying: { video, position } });
  };

  // @todo timer before autoplay
  nextTrack = () => this.setTrack(this.state.currentlyPlaying.video + 1);

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

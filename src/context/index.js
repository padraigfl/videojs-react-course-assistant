import React, { Component, createContext } from 'react';

import { filmish as dummyPlaylist } from '../constants/dummy';

export const Context = createContext();

export const insertAtIdx = (list, idx, entry) => [
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
    notes: []
  };

  constructor(props) {
    super(props);

    this.state = {
      availableData: [], // list of playlists in localStorage
      playlist: this.props.playlist,
      notes: this.props.notes,
      // bookmarks: [], bookmarks = notes with just a timestamp
      currentlyPlaying: {
        video: 0, // index in array
        position: 0
      },
      video: null
    };
    if (this.props.playlist) {
      this.getSavedPlaylist(this.props.playlist.id);
    }
  }

  componentDidMount() {
    // check local storage
  }

  getSavedData = () => {};

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
    // @todo tidyup
    add: ({ text, time }, vidId) => {
      const list = this.state[key] && this.state[key][vidId];
      const arrayLength = Array.isArray(list) && list.length;

      if (!arrayLength) {
        this.setState(
          state => ({
            [key]: {
              ...state[key],
              [vidId]: [{ text, time }]
            }
          }),
          this.saveData
        );
        return;
      }
      const insertionIndex = list.findIndex(entry => entry.time >= time);
      this.setState(
        state => ({
          [key]: {
            ...state[key],
            [vidId]: insertAtIdx(
              state[key][vidId],
              insertionIndex !== -1 ? insertionIndex : arrayLength,
              {
                text,
                time
              }
            )
          }
        }),
        this.saveData
      );
    },
    edit: (note, vidId, idx) =>
      idx < this.state[key][vidId].length &&
      this.setState(
        state => ({
          [key]: {
            ...state[key],
            [vidId]: {
              note: replaceAtIdx(state[key][vidId], idx, note)
            }
          }
        }),
        this.saveData
      ),
    delete: (vidId, idx) =>
      this.setState(
        state => ({
          [key]: {
            ...state[key],
            [vidId]: [
              ...state[key][vidId].slice(0, idx),
              ...state[key][vidId].slice(idx + 1, state[key].length)
            ]
          }
        }),
        this.saveData
      )
  });

  alterNotes = this.alterFields('notes');

  getSrc = idx => {
    const vidId =
      Array.isArray(this.state.playlist.order) &&
      this.state.playlist.order[idx];
    if (vidId || vidId === 0) {
      return `https://youtu.be/${vidId}`;
    }
    return '';
  };

  getCurrentlyPlayingId = () =>
    this.state.playlist.order[this.state.currentlyPlaying.video];

  setTrack = (video, position = 0) => {
    const source = this.getSrc(video);
    if (!source) {
      console.error('no track found');
      return;
    }
    this.state.video.src({
      type: 'video/youtube',
      src: source
    });
    // @todo update thumbnail
    this.state.video.play();
    this.state.video.currentTime(position);

    this.setState({ currentlyPlaying: { video, position } });
  };

  // @todo timer before autoplay
  nextTrack = () => {
    this.setTrack(this.state.currentlyPlaying.video + 1);
  };

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
          alterNotes: this.alterNotes,
          getCurrentlyPlayingId: this.getCurrentlyPlayingId
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context;

import React, { Component, createContext } from 'react';

export const CourseContext = createContext();

export class CourseProvider extends Component {
  state = {
    availableData: [], // list of playlists in localStorage
    playlist: {},
    notes: [],
    // bookmarks: [], bookmarks = notes with just a timestamp
    currentlyPlaying: null,
    video: null
  };

  componentDidMount() {
    // check local storage
  }

  getLocalStorageObject = key =>
    JSON.parse(window.localStorage.getItem(key) || '[]');

  // checks if playlist is on local storage and pulls data from there
  getData = playlistId => {
    const playlist = window.localStorage.getItem(playlistId);
    if (!playlist) {
      return;
    }
    // @todo: validate
    this.setState({
      playlist,
      notes: this.getLocalStorageObject(`${playlistId}__notes`),
      bookmarks: this.getLocalStorageObject(`${playlistId}__bookmarks`)
    });
  };

  saveData = field => data => {
    window.localStorage.setItem(
      [`${this.state.playlist.id}${field ? `__${field}` : ''}`],
      JSON.stringify(data)
    );
  };

  setPlaylist = playlist => {
    this.setState({ playlist });
  };

  alterFields = key => ({
    add: val => {
      this.setState(
        state => ({ [key]: [...state[key], val] }),
        this.saveData(key)
      );
    },
    edit: (update, idx) =>
      this.setState(
        state => ({
          [key]: [
            ...state.bookmarks.slice(0, idx),
            update,
            ...state.bookmarks.slice(idx, state[key].length)
          ]
        }),
        this.saveData(key)
      ),
    delete: idx =>
      this.setState(
        state => ({
          [key]: {
            ...state[key].slice(0, idx),
            ...state[key].slice(idx, state[key].length)
          }
        }),
        this.saveData(key)
      )
  });

  alterNotes = this.alterFields('notes');

  setTrack = number => this.setState({ currentlyPlaying: number });

  setVideo = vid => this.setState({ video: vid });

  render() {
    return (
      <CourseContext.Provider
        value={{
          ...this.state,
          setVideo: this.setVideo,
          setTrack: this.setTrack,
          alterNotes: this.alterNotes
        }}
      >
        {this.props.children}
      </CourseContext.Provider>
    );
  }
}

export default CourseContext;

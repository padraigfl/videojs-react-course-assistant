import React, { Component, createContext } from 'react';

export const CourseContext = createContext();

export class CourseProvider extends Component {
  static defaultProps = {
    playlist: {},
    notes: []
  };

  state = {
    availableData: [], // list of playlists in localStorage
    playlist: this.props.playlist,
    notes: this.props.notes,
    // bookmarks: [], bookmarks = notes with just a timestamp
    currentlyPlaying: null,
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
    add: ({ note, time, video }) => {
      this.setState(
        state => ({ [key]: [...state[key], { note, time, video }] }),
        this.saveData
      );
    },
    edit: ({ note, time, video }, idx) =>
      idx < this.state[key].length &&
      this.setState(
        state => ({
          [key]: [
            ...state[key].slice(0, idx),
            {
              note,
              time: time || state[key][idx].time,
              video
            },
            ...state[key].slice(idx + 1, state[key].length)
          ]
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

  setTrack = (number, position = 0) =>
    this.setState({ currentlyPlaying: { number, position } });

  setVideo = vid => this.setState({ video: vid });

  render() {
    return (
      <CourseContext.Provider
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
      </CourseContext.Provider>
    );
  }
}

export default CourseContext;

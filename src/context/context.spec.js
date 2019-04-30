import { CourseProvider } from '.';

const localStorageMock = () => {
  let store = {};
  return {
    clear() {
      store = {};
    },
    getItem(key) {
      return store[key];
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    }
  };
};

const mockVideo = {
  src: jest.fn(),
  play: jest.fn(),
  on: jest.fn()
};

const noteGen = val => ({
  text: val,
  time: val,
  video: val
});

Object.defineProperty(window, 'localStorage', { value: localStorageMock() });

describe('ProgramProvider', () => {
  const component = new CourseProvider({ props: {} });
  component.state.video = mockVideo;
  component.state.playlist = [];
  component.setState = val => {
    if (typeof val !== 'function') {
      component.state = {
        ...component.state,
        ...val
      };
    } else {
      component.state = {
        ...component.state,
        ...val(component.state)
      };
    }
  };

  it('setVideo', () => {
    const x = { ...mockVideo };
    component.setVideo(x);
    expect(component.state.video).toEqual(x);
  });

  it('setTrack', () => {
    component.setTrack(0);
    expect(component.state.currentlyPlaying).toEqual({
      number: 0,
      position: 0
    });
    component.setTrack(1, 123);
    expect(component.state.currentlyPlaying).toEqual({
      number: 1,
      position: 123
    });
  });

  it('getSavedPlaylist', () => {
    const playlist = { a: '123' };
    window.localStorage.setItem('playlist__playlist', JSON.stringify(playlist));
    expect(component.getSavedPlaylist('a')).toEqual(null);
    expect(component.getSavedPlaylist('playlist')).toEqual(playlist);
  });

  it('setNewPlaylist', () => {
    const playlist = { id: 'a', items: [] };
    component.setNewPlaylist(playlist);
    expect(component.state.playlist).toEqual(playlist);
    expect(component.state.notes).toEqual([]);
  });

  describe('alterNotes', () => {
    const note0 = noteGen('0');
    const note1 = noteGen('1');
    const note2 = noteGen('2');

    const editNote = { text: '2aa', time: '2', video: '2' };
    it('addNotes', () => {
      component.alterNotes.add(note2);
      expect(component.state.notes).toEqual([note2]);
      component.alterNotes.add(note0);
      expect(component.state.notes).toEqual([note0, note2]);
      component.alterNotes.add(note1);
      expect(component.state.notes).toEqual([note0, note1, note2]);
    });
    it('editNotes', () => {
      component.alterNotes.edit(editNote, 0);
      expect(component.state.notes).toEqual([editNote, note1, note2]);

      // does not add if beyond index
      component.alterNotes.edit(editNote, 5);
      expect(component.state.notes).toEqual([editNote, note1, note2]);
    });
    it('deleteNotes', () => {
      component.alterNotes.delete(1);
      expect(component.state.notes).toEqual([editNote, note2]);
    });
  });
});

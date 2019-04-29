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

Object.defineProperty(window, 'localStorage', { value: localStorageMock() });

describe('ProgramProvider', () => {
  const component = new CourseProvider({
    props: { startMenuData: [], desktopData: [] }
  });
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
    const x = () => ({ stuff: 'test' });
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
    it('addNotes', () => {
      const note = { note: '1', time: '1', video: '1' };
      component.alterNotes.add(note);
      expect(component.state.notes).toEqual([note]);
    });
    it('editNotes', () => {
      const note = { note: '2', time: '2', video: '2' };
      component.alterNotes.edit(note, 0);
      expect(component.state.notes).toEqual([note]);

      // does not add if beyond index
      component.alterNotes.edit(note, 5);
      expect(component.state.notes).toEqual([note]);
    });
    it('deleteNotes', () => {
      const note = { note: '3', time: '3', video: '3' };
      component.alterNotes.add(note);
      component.alterNotes.delete(0);
      expect(component.state.notes).toEqual([note]);
    });
  });
});

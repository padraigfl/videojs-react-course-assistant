import { CourseProvider, insertAtIdx } from '.';

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
  on: jest.fn(),
  currentTime: jest.fn()
};

const noteGen = val => ({
  text: val,
  time: val
});

Object.defineProperty(window, 'localStorage', { value: localStorageMock() });

describe('ProgramProvider', () => {
  const component = new CourseProvider({ props: {} });
  component.state.video = mockVideo;
  component.state.playlist = { id: 'abc' };
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
    component.state.playlist = {
      order: [0, 1]
    };
    component.setTrack(0);
    expect(component.state.currentlyPlaying).toEqual({
      video: 0,
      position: 0
    });
    component.setTrack(1, 123);
    expect(component.state.video.currentTime).toHaveBeenCalled();
    expect(component.state.currentlyPlaying).toEqual({
      video: 1,
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

  it('insert at index', () => {
    const list = [1, 2, 4, 5, 6];
    expect(insertAtIdx(list, 2, 3)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(insertAtIdx(list, 5, 7)).toEqual([1, 2, 4, 5, 6, 7]);
    expect(insertAtIdx([], 0, 7)).toEqual([7]);
  });

  describe('alterNotes', () => {
    const note0 = noteGen(0);
    const note1 = noteGen(1);
    const note2 = noteGen(2);
    const note3 = noteGen(3);

    const editNote = { text: '2aa', time: '2' };
    it('addNotes', () => {
      component.alterNotes.add(note0, 'a');
      expect(component.state.notes).toEqual({ a: [note0] });
      component.alterNotes.add(note3, 'a');
      expect(component.state.notes).toEqual({ a: [note0, note3] });
      component.alterNotes.add(note2, 'b');
      expect(component.state.notes).toEqual({
        a: [note0, note3],
        b: [note2]
      });
      component.alterNotes.add(note1, 'a');
      expect(component.state.notes).toEqual({
        a: [note0, note1, note3],
        b: [note2]
      });
    });
    it('deleteNotes', () => {
      component.alterNotes.delete('a', 1);
      expect(component.state.notes).toEqual({
        a: [note0, note3],
        b: [note2]
      });
    });
    xit('editNotes', () => {
      component.alterNotes.edit(editNote, 0);
      expect(component.state.notes).toEqual([editNote, note1, note2]);

      // does not add if beyond index
      component.alterNotes.edit(editNote, 5);
      expect(component.state.notes).toEqual([editNote, note1, note2]);
    });
  });
});

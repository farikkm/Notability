import { create } from "zustand";
import { NoteType } from "shared/types";

interface NotesState {
  notes: NoteType[];
  addNote: (note: NoteType) => void;
  updateNote: (id: string, updatedNote: Partial<NoteType>) => void;
  deleteNote: (id: string) => void;
  clearNotes: () => void;
}

export const useNotesStore = create<NotesState>()((set) => ({
  notes: [],
  addNote: (note) => {
    set((state) => ({ notes: [...state.notes, note] }));
  },
  updateNote: (id, updatedNote) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updatedNote } : note
      ),
    }));
  },
  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
  },
  clearNotes: () => set({ notes: [] }),
}));

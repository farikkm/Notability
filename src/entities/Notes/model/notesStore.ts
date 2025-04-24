import { create } from "zustand";
import { NoteType } from "shared/types";

interface NotesState {
  notes: NoteType[];
  error: string | null;

  // Mutations
  setNotes: (notes: NoteType[]) => void;
  setError: (error: string | null) => void;

  // Actions
  addNote: (note: NoteType) => void;
  updateNote: (id: string, updatedNote: Partial<NoteType>) => void;
  deleteNote: (id: string) => void;
  clearNotes: () => void;
}

export const useNotesStore = create<NotesState>()((set) => ({
  notes: [],
  error: null,

  setError: (error) => set({ error }),
  setNotes: (notes) => set({ notes }),

  // Actions
  addNote: (note) => {
    set((state) => ({ notes: [...state.notes, note] }));
  },
  updateNote: (id, updatedNote) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note._id === id ? { ...note, ...updatedNote } : note
      ),
    }));
  },
  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note._id !== id),
    }));
  },
  clearNotes: () => set({ notes: [] }),
}));

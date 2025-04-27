import { create } from "zustand";
import { NoteType } from "shared/types";

interface NotesState {
  notes: NoteType[];

  loading: boolean;
  error: string | null;

  // Mutations
  setNotes: (notes: NoteType[]) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;

  // Actions
  addNote: (note: NoteType) => void;
  updateNote: (id: string, updatedNote: Partial<NoteType>) => void;
  deleteNote: (id: string) => void;
  clearNotes: () => void;
}

export const useNotesStore = create<NotesState>()((set) => ({
  notes: [],

  loading: false,
  error: null,

  setError: (error) => set({ error }),
  setNotes: (notes) => set({ notes }),
  setLoading: (loading) => set({ loading }),

  // Actions
  addNote: (note) => {
    set((state) => ({ notes: [note, ...state.notes] }));
  },
  updateNote: (id, updatedNote) => {
    console.log("id: ", id);
    console.log("Note: ", updatedNote);
    
    
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

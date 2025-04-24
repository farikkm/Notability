import { useNotesStore } from "entities/Notes/model";
import { useEffect } from "react";
import { getAllNotes } from "shared/api";

export const useFetchNotes = () => {
  const notes = useNotesStore((state) => state.notes);
  const error = useNotesStore((state) => state.error);
  const setNotes = useNotesStore((state) => state.setNotes);
  const setError = useNotesStore((state) => state.setError);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const result = await getAllNotes();
        setNotes(result);
      } catch (error) {
        setError("Failed to get notes");
      }
    };

    getNotes();
  }, []);

  return {
    notes,
    error,
  };
};

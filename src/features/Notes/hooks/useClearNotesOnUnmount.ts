import { useEffect } from "react";
import { useNotesStore } from "entities/Notes/model";

export const useClearNotesOnUnmount = (deps: unknown[]) => {
  const clearNotes = useNotesStore((state) => state.clearNotes);

  useEffect(() => {
    return () => clearNotes();
  }, deps);
};
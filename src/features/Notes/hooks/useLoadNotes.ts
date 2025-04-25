import { useEffect } from "react";
import { useNotesStore } from "entities/Notes/model";
import { getNotesRequest } from "features/Notes/hooks";

export const useLoadNotes = () => {
  const setNotes = useNotesStore((state) => state.setNotes);
  const setError = useNotesStore((state) => state.setError);
  const setLoading = useNotesStore((state) => state.setLoading);

  useEffect(() => {
    const getAllNotes = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getNotesRequest();
        setNotes(data.notes);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Произошла неизвестная ошибка");
        }
      } finally {
        setLoading(false);
      }
    };

    getAllNotes();
  }, []);
};

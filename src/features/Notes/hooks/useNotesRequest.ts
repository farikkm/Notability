import { safeFetch } from "shared/api";
import { NoteType } from "shared/types";
import { getToken } from "shared/lib/token";

export const getNotesRequest = async () => {
  const token = getToken();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  try {
    const data = await safeFetch(`${apiBaseUrl}/api/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occured while getting all notes");
    }
  }

  return [];
};

type NewNoteType = {
  message: string;
  noteId: string;
};

export const addNoteRequest = async (
  note: Omit<NoteType, "_id">
): Promise<Pick<NewNoteType, "noteId">> => {
  const token = getToken();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  try {
    const data = await safeFetch(`${apiBaseUrl}/api/notes/add`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occured while adding new note");
    }
  }

  return { noteId: "new-note" };
};

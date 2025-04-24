import { safeFetch } from "shared/api";
import { getToken } from "shared/lib/token";
import { NoteType } from "shared/types";

export const addNoteRequest = async (note: Omit<NoteType, "_id">): Promise<string> => {
  const token = getToken();

  const response = await safeFetch("http://localhost:3001/api/notes/add", {
    method: "POST",
    body: JSON.stringify(note),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.noteId;
}
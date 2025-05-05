import { safeFetch } from "shared/api";
import { NoteType } from "shared/types";
import { getToken } from "shared/lib/token";

type GetNotesRequestType = {
  notes: NoteType[];
}

type AddNoteResponseType = {
  message: string;
  noteId: string;
};

type UpdatedNoteResponseType = {
  message: string;
  note: NoteType;
};

type DeletedNoteResponseType = {
  message: string;
};

const getHeaders = (): HeadersInit => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getNotesRequest = async (): Promise<GetNotesRequestType> => {
  try {
    const data = await safeFetch(`${apiBaseUrl}/api/notes`, {
      method: "GET",
      headers: getHeaders(),
    });

    return data;
  } catch (error) {
    console.error("Error occurred while getting all notes:", error);
    return { notes: [] };
  }
};

export const addNoteRequest = async (
  note: Omit<NoteType, "_id">
): Promise<Pick<AddNoteResponseType, "noteId">> => {
  try {
    return await safeFetch(`${apiBaseUrl}/api/notes/add`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: getHeaders(),
    });
  } catch (error) {
    console.error("Error occurred while adding a new note:", error);
    return { noteId: `new-note-${Date.now()}` };
  }
};

export const updateNoteRequest = async (
  { _id }: Pick<NoteType, "_id">,
  note: Partial<NoteType>
): Promise<UpdatedNoteResponseType> => {
  try {
    return await safeFetch(`${apiBaseUrl}/api/notes/update/${_id}`, {
      method: "PATCH",
      body: JSON.stringify(note),
      headers: getHeaders(),
    });
  } catch (error) {
    console.error("Error occurred while updating the note:", error);
    throw error;
  }
};

export const deleteNoteRequest = async (
  { _id }: Pick<NoteType, "_id">
): Promise<DeletedNoteResponseType> => {
  try {
    return await safeFetch(`${apiBaseUrl}/api/notes/delete/${_id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
  } catch (error) {
    console.error("Error occurred while deleting the note:", error);
    throw error;
  }
};

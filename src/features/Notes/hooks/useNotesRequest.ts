import { safeFetch } from "shared/api";
import { NoteType } from "shared/types";
import { getToken } from "shared/lib/token";

type AddNoteResponseType = {
  message: string;
  noteId: string;
};

type UpdatedNoteResponseType = {
  message: string;
  note: NoteType;
}

type DeletedNoteResponseType = {
  message: string;
}

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

export const addNoteRequest = async (
  note: Omit<NoteType, "_id">
): Promise<Pick<AddNoteResponseType, "noteId">> => {
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

  return { noteId: `new-note ${new Date()}` };
};

export const updateNoteRequest = async (
  {_id}: Pick<NoteType, "_id">,
  note: Partial<NoteType>
): Promise<UpdatedNoteResponseType> => {
  const token = getToken();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
  try {
    const data = await safeFetch(`${apiBaseUrl}/api/notes/update/${_id}`, {
      method: "PATCH",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occured while updating the note");
    }
    throw error;
  }
};

export const deleteNoteRequest = async (
  {_id}: Pick<NoteType, "_id">
): Promise<DeletedNoteResponseType> => {
  const token = getToken();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
  try {
    const data = await safeFetch(`${apiBaseUrl}/api/notes/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occured while deleting the note");
    }
    throw error;
  }
};

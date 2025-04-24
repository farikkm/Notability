import { safeFetch } from "shared/api";
import { getToken } from "shared/lib/token";

export const getAllNotes = async () => {
  const token = getToken();

  try {
    const data = await safeFetch("http://localhost:3001/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data.notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

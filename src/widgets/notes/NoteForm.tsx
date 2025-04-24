import React from "react";
import { safeFetch } from "shared/api";
import { useUserStore } from "entities/User/model";

const NoteForm = () => {
  const token = useUserStore((state) => state.token);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("note-title") as string;
    const content = formData.get("note-content") as string;
    console.log("Title:", title);
    console.log("Content:", content);

    try {
      const result = await safeFetch(`http://localhost:3001/api/notes/add`, {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST" id="add-note">
      <div>
        <label htmlFor="note-title">Title:</label>
        <input type="text" id="note-title" name="note-title" required />
      </div>
      <div>
        <label htmlFor="note-content">Content:</label>
        <textarea id="note-content" name="note-content" required></textarea>
      </div>
      <div>
        <button type="submit">Add Note</button>
      </div>
    </form>
  );
};

export default NoteForm;

import { useState } from "react";

export const useNoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
  }

  return {
    title,
    content,
    handleTitleChange,
    handleContentChange,
    resetForm
  };
}
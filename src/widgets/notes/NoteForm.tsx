import { Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNotesStore } from "entities/Notes/model";
import { createNotePayload } from "features/Notes/lib";
import { addNoteRequest, useNoteForm } from "features/Notes/hooks";

export const NoteForm = () => {
  const { title, content, handleTitleChange, handleContentChange, resetForm } =
    useNoteForm();

  // Actions
  const addNote = useNotesStore((state) => state.addNote);

  const handleSubmit = async () => {
    const newNote = createNotePayload(title, content);

    try {
      const note = await addNoteRequest(newNote);
      console.log(note);
      
      addNote({ ...newNote, _id: note.noteId });
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form method="POST" layout="vertical" onFinish={handleSubmit} id="add-note">
      <Form.Item label="Title" name="note-title" required>
        <Input
          type="text"
          id="note-title"
          name="note-title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </Form.Item>
      <Form.Item label="Content" name="note-content" required>
        <TextArea
          id="note-content"
          name="note-content"
          value={content}
          onChange={handleContentChange}
          required
        ></TextArea>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" block>
          Add Note
        </Button>
      </Form.Item>
    </Form>
  );
};

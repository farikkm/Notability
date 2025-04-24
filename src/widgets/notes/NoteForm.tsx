import { useState } from "react";
import { safeFetch } from "shared/api";
import { Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useUserStore } from "entities/User/model";

const NoteForm = () => {
  // States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = useUserStore((state) => state.token);

  // Actions
  const setTitleState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const setContentState = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Handlers
  const handleSubmit = async () => {
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
    <>
      <Form
        method="POST"
        layout="vertical"
        onFinish={handleSubmit}
        id="add-note"
      >
        <Form.Item label="Title" name="note-title" required>
          <Input
            type="text"
            id="note-title"
            name="note-title"
            value={title}
            onChange={setTitleState}
            required
          />
        </Form.Item>
        <Form.Item label="Content" name="note-content" required>
          <TextArea
            id="note-content"
            name="note-content"
            value={content}
            onChange={setContentState}
            required
          ></TextArea>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" block>Add Note</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NoteForm;

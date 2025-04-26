import { useState } from "react";
import { Modal } from "antd";
import { AddNoteButton } from "features/Notes/ui";
import { NoteForm } from "entities/Notes/ui/NoteForm";
import { createNotePayload } from "features/Notes/lib";
import { addNoteRequest } from "features/Notes/hooks";
import { useNotesStore } from "entities/Notes/model";

export const AddNoteModal = () => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addNote = useNotesStore((state) => state.addNote)

  // UI
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handlers
  const handleSubmit = async (values: { title: string; content: string }) => {
    const newNote = createNotePayload(values.title, values.content);

    try {
      const note = await addNoteRequest(newNote);
      addNote({ ...newNote, _id: note.noteId });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AddNoteButton onClick={showModal} />
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={700}
        styles={{
          body: {
            padding: 0,
          },
        }}
        centered
      >
        <div className="p-6">
          <h2 className="text-2xl text-center">Add Note</h2>
          <NoteForm onSubmit={handleSubmit}/>
        </div>
      </Modal>
    </>
  );
}
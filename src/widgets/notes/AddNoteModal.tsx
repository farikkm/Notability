import { Modal } from "antd";
import { useState } from "react";
import { NoteForm } from "entities/Notes/ui";
import { AddNoteButton } from "features/Notes/ui";
import { createNotePayload } from "features/Notes/lib";
import { addNoteRequest } from "features/Notes/hooks";
import { useNotesStore } from "entities/Notes/model";
import { useTranslation } from "react-i18next";

export const AddNoteModal = () => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addNote = useNotesStore((state) => state.addNote)

  const { t } = useTranslation();

  // UI
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCancel = () => {
    closeModal();
  };

  // Handlers
  const handleSubmit = async (values: { title: string; content: string }) => {
    const newNote = createNotePayload(values.title, values.content);

    try {
      const note = await addNoteRequest(newNote);
      addNote({ ...newNote, _id: note.noteId });
      closeModal();
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
          <h2 className="text-2xl text-center">{t("notes.add-note.title")}</h2>
          <NoteForm onSubmit={handleSubmit} title="" content="" buttonValue={t("notes.add-note.button")} />
        </div>
      </Modal>
    </>
  );
}
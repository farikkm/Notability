import { Modal } from "antd";
import { useNotesStore } from "entities/Notes/model";
import { NoteForm } from "entities/Notes/ui";
import { updateNoteRequest } from "features/Notes/hooks";
import { UpdateNoteButton } from "features/Notes/ui/UpdateNoteButton";
import { useState } from "react";

const UpdateNoteModal = ({
  title,
  content,
  noteId
}: {
  title: string;
  content: string;
  noteId: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const updateNote = useNotesStore((state) => state.updateNote)

  // UI
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCancel = () => {
    closeModal();
  };

  const handleSubmit = async (values: { title: string; content: string }) => {
    console.log(noteId);
    
    try {
      const data = await updateNoteRequest(
        { _id: noteId },
        { title: values.title, content: values.content }
      );
      updateNote(data.note._id, data.note);
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <UpdateNoteButton onClick={showModal} />
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
          <h2 className="text-2xl text-center">Update Note</h2>
          <NoteForm
            onSubmit={handleSubmit}
            title={title}
            content={content}
            buttonValue="Update Note"
          />
        </div>
      </Modal>
    </>
  );
};

export default UpdateNoteModal;

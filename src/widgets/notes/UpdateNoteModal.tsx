import { Modal } from "antd";
import { NoteForm } from "entities/Notes/ui";
import { UpdateNoteButton } from "features/Notes/ui/UpdateNoteButton";
import { useState } from "react";

const UpdateNoteModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // UI
    const showModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const handleCancel = () => {
      closeModal();
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
          <NoteForm onSubmit={async () => {}}/>
        </div>
      </Modal>
    </>
  );
};

export default UpdateNoteModal;

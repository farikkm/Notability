import { Modal } from "antd";
import { ShowNoteInfoButton } from "features/Notes/ui";
import { useState } from "react";
import { NoteType } from "shared/types";

export const ShowModalInfo: React.FC<Partial<NoteType>> = ({
  content,
  title,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // UI
  const showModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div>
      <ShowNoteInfoButton onClick={showModal} />
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
          <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
          <div className="w-full h-[1px] bg-black mb-4" />
          <p className="text-base">{content}</p>
        </div>
      </Modal>
    </div>
  );
};

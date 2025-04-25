import React, { useState } from "react";
import { Card, Modal } from "antd";
import { NoteType } from "shared/types";

export const MyCard: React.FC<Partial<NoteType>> = ({ content, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        title={title}
        variant="outlined"
        style={{ width: "100%", backgroundColor: "#fefce8" }}
        onClick={showModal}
        hoverable
        className="cursor-pointer select-none"
      >
        <p>{content}</p>
      </Card>
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
    </>
  );
};

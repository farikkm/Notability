import React, { useState } from "react";
import { Card, Modal } from "antd";
import { NoteType } from "shared/types";

export const MyCard: React.FC<Partial<NoteType>> = ({ content, title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
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
      >
        <p>{content}</p>
      </Card>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );  
}
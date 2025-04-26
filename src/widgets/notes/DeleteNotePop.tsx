import React from "react";
import type { PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import { Trash2 } from "lucide-react";

const confirm: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Click on Yes");
};

const cancel: PopconfirmProps["onCancel"] = (e) => {
  console.log(e);
  message.error("Click on No");
};

export const DeleteNotePop: React.FC = () => (
  <Popconfirm
    title="Delete the note"
    description="Are you sure to delete this note?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <Button
      type="default"
      icon={<Trash2 size={16} />}
      onClick={() => {}}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "all 0.3s ease",
        backgroundColor: "#fff",
        borderColor: "#d9d9d9",
        color: "rgba(0, 0, 0, 0.88)",
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.backgroundColor = "#ff4d4f"; // красный
        target.style.borderColor = "#ff4d4f";
        target.style.color = "white";
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.backgroundColor = "#fff"; // default
        target.style.borderColor = "#d9d9d9";
        target.style.color = "rgba(0, 0, 0, 0.88)";
      }}
    />
  </Popconfirm>
);

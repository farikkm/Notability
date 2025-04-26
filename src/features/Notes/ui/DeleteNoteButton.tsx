import React from "react";
import { Button } from "antd";
import { Trash2 } from "lucide-react";

interface DeleteNoteButtonProps {
  onClick: () => void;
}

export const DeleteNoteButton: React.FC<DeleteNoteButtonProps> = ({
  onClick,
}) => {
  return (
    <Button
      type="default"
      icon={<Trash2 size={16} />}
      onClick={onClick}
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
  );
};

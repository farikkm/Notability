import React from "react";
import { Button } from "antd";
import { Pencil } from "lucide-react";

interface AddNoteButtonProps {
  onClick: () => void;
}

export const AddNoteButton: React.FC<AddNoteButtonProps> = ({ onClick }) => {
  return (
    <Button
      type="default"
      icon={<Pencil size={16} />}
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
        target.style.backgroundColor = "#fadb14"; // жёлтый
        target.style.borderColor = "#fadb14";
        target.style.color = "black";
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

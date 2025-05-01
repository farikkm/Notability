import React from "react";
import { Button } from "antd";
import { Pencil } from "lucide-react";

interface UpdateNoteButtonProps {
  onClick: () => void;
}

export const UpdateNoteButton: React.FC<UpdateNoteButtonProps> = ({ onClick }) => {
  return (
    <Button
      type="dashed"
      icon={<Pencil size={16} />}
      onClick={onClick}
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   gap: 8,
      //   transition: "all 0.3s ease",
      //   backgroundColor: "#fff",
      //   borderColor: "#d9d9d9",
      //   color: "rgba(0, 0, 0, 0.88)",
      // }}
      // onMouseEnter={(e) => {
      //   const target = e.currentTarget;
      //   target.style.backgroundColor = "#1677ff"; // primary
      //   target.style.borderColor = "#1677ff";
      //   target.style.color = "white";
      // }}
      // onMouseLeave={(e) => {
      //   const target = e.currentTarget;
      //   target.style.backgroundColor = "#fff"; // default
      //   target.style.borderColor = "#d9d9d9";
      //   target.style.color = "rgba(0, 0, 0, 0.88)";
      // }}
    />
  );
};

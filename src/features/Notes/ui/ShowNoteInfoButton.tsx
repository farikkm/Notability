import React, { useState } from "react";
import { Button } from "antd";
import { Eye, EyeClosed } from "lucide-react";

interface ShowNoteInfoButtonProps {
  onClick: () => void;
}

export const ShowNoteInfoButton: React.FC<ShowNoteInfoButtonProps> = ({
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      type="dashed"
      icon={
        <span
          className="transition-all duration-300 ease-in-out"
          style={{ display: "flex", alignItems: "center" }}
        >
          {hovered ? <Eye size={16} /> : <EyeClosed size={16} />}
        </span>
      }
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   gap: 8,
      //   transition: "all 0.3s ease",
      //   backgroundColor: "#fff",
      //   borderColor: "#d9d9d9",
      //   color: "rgba(0, 0, 0, 0.88)",
      // }}
    ></Button>
  );
};

import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useThemeStore } from "shared/model";

export const ThemeToggleButton = () => {
  const [rotation, setRotation] = useState(0);
  const { theme, toggleTheme } = useThemeStore();

  const handleClick = () => {
    toggleTheme();
    setRotation((prev) => prev === 0 ? 360 : 0);
  }

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          transition: "transform 0.5s ease",
          transform: `rotate(${rotation}deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }}
      >
        {theme === "light" ? <Sun color="black" size={24} /> : <Moon color="white" size={24} />}
      </div>
    </button>
  );
};

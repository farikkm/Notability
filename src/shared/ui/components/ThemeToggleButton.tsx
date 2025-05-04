import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useThemeStore } from "shared/model";

export const ThemeToggleButton = () => {
  const [rotation, setRotation] = useState(0);
  const { theme, toggleTheme } = useThemeStore();

  const handleClick = () => {
    toggleTheme();
    setRotation((prev) => (prev === 0 ? 360 : 0));
  };

  return (
    <button onClick={handleClick}>
      <div className="flex justify-center items-center w-10 h-10 rounded-xl cursor-pointer bg-yellow-500 text-white dark:bg-black">
        <div
          style={{
            transition: "transform 0.5s ease",
            transform: `rotate(${rotation}deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {theme === "light" ? (
            <Sun color="white" size={24} />
          ) : (
            <Moon color="white" size={24} />
          )}
        </div>
      </div>
    </button>
  );
};

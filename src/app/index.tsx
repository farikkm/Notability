import { useEffect, useState } from "react";
import { createAppRouter } from "app/routing";
import { RouterProvider } from "react-router-dom";
import { useUserStore } from "entities/User/model";
import { ConfigProvider, theme } from "antd";
import { Sun, Moon } from "lucide-react";

const router = createAppRouter();

const App = () => {
  const initFromLocalStorage = useUserStore(
    (state) => state.initFromLocalStorage
  );

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  });

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    initFromLocalStorage();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
    setRotation((prev) => prev + 180); // Каждый раз добавляем 180° вращения
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div style={{ minHeight: "100vh" }}>
        {/* Переключатель темы */}
        <button
          onClick={toggleTheme}
          style={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 1000,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
            borderRadius: 8,
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            style={{
              transition: "transform 0.5s ease",
              transform: `rotate(${rotation}deg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </div>
        </button>

        <RouterProvider router={router} />
      </div>
    </ConfigProvider>
  );
};

export default App;

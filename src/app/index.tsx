import { useEffect } from "react";
import { createAppRouter } from "app/routing";
import { RouterProvider } from "react-router-dom";
import { useUserStore } from "entities/User/model";
import { ConfigProvider, theme } from "antd";
import { ThemeToggleButton } from "shared/ui/components";
import { useThemeStore } from "shared/model";

const router = createAppRouter();

const App = () => {
  const initFromLocalStorage = useUserStore(
    (state) => state.initFromLocalStorage
  );
  const themeState = useThemeStore((state) => state.theme)

  useEffect(() => {
    initFromLocalStorage();
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: themeState === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div style={{ minHeight: "100vh" }}>
        {/* Переключатель темы */}
        <ThemeToggleButton />

        <RouterProvider router={router} />
      </div>
    </ConfigProvider>
  );
};

export default App;

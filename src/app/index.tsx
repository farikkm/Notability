import { Suspense, useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { useThemeStore } from "shared/model";
import { createAppRouter } from "app/routing";
import { RouterProvider } from "react-router-dom";
import { useUserStore } from "entities/User/model";
import {
  LanguageSwitcher,
  LoadingSpinner,
  ThemeToggleButton,
} from "shared/ui/components";

import "app/config/i18n";

const router = createAppRouter();

const App = () => {
  const initFromLocalStorage = useUserStore(
    (state) => state.initFromLocalStorage
  );
  const themeState = useThemeStore((state) => state.theme);

  useEffect(() => {
    initFromLocalStorage();
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ConfigProvider
        theme={{
          algorithm:
            themeState === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
        }}
      >
        <div style={{ minHeight: "100vh" }}>
          {/* Переключатель темы */}
          <div className="fixed right-4 top-3 flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggleButton />
          </div>

          <RouterProvider router={router} />
        </div>
      </ConfigProvider>
    </Suspense>
  );
};

export default App;

import { Suspense, useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { useThemeStore } from "shared/model";
import { appRouter } from "app/routing";
import { RouterProvider } from "react-router-dom";
import { useUserStore } from "entities/User/model";
import { LoadingSpinner } from "shared/ui/components";

import "app/config/i18n";

const router = appRouter();

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
          <RouterProvider router={router} />
        </div>
      </ConfigProvider>
    </Suspense>
  );
};

export default App;

import { useEffect } from "react";
import { createAppRouter } from "app/routing";
import { RouterProvider } from "react-router-dom";
import { useUserStore } from "entities/User/model";

const router = createAppRouter();

const App = () => {
  const initFromLocalStorage = useUserStore(
    (state) => state.initFromLocalStorage
  );

  useEffect(() => {
    initFromLocalStorage();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;

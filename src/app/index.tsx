import { router } from "app/routing"
import { useUserStore } from "entities/User";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom"

const App = () => {
  const initFromLocalStorage = useUserStore((state) => state.initFromLocalStorage)

  useEffect(() => {
    initFromLocalStorage()
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
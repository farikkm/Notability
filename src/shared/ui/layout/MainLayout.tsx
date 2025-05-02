import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useThemeStore } from "shared/model"

export const MainLayout = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="h-screen w-screen bg-gray-50 dark:bg-gray-800 text-black transition-colors duration-300">
      <Outlet />
    </div>
  )
}
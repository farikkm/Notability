import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useThemeStore } from "shared/model";
import { UserActivities } from "widgets/user";
import { LoginButton } from "features/Auth/ui";
import { LanguageSwitcher, ThemeToggleButton } from "shared/ui/components";

export const MainLayout = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="wrapper">
      <div className="fixed left-4 top-3">
        <LoginButton />
      </div>
      <div className="fixed right-4 top-3 flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeToggleButton />
        <UserActivities />
      </div>
      <Outlet />
    </div>
  );
};

import { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { useUserStore } from "entities/User/model";
import { UserProfileIcon } from "shared/ui/components";

export const UserActivities = () => {
  // States
  const email = useUserStore((state) => state.email);

  // Hooks
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const items: MenuProps["items"] = [
    {
      label: email ? email : "",
      key: "1",
      danger: true,
      disabled: true,
    },
    {
      label: "Settings",
      key: "2",
      icon: <Settings />,
    },
    {
      label: "Logout",
      key: "3",
      icon: <LogOut />,
      danger: true,
      onClick: handleLogout
    },
  ];

  return email && <UserProfileIcon items={items} />;
}

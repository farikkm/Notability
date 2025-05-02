import { Dropdown, MenuProps } from "antd";
import { useUserStore } from "entities/User/model";
import { BookUser, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";


export const UserProfileIcon = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const items: MenuProps["items"] = [
    {
      label: "note2@note.com",
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


  return (
    <Dropdown placement="bottomRight" menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <div className="flex justify-center items-center w-10 h-10 rounded-xl cursor-pointer bg-yellow-500 text-white dark:bg-black">
          <BookUser />
        </div>
      </a>
    </Dropdown>
  );
};

import { useUserStore } from "entities/User/model";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return <button className="bg-gray-100 p-2 rounded-2xl" onClick={handleLogout}>Log Out</button>;
};

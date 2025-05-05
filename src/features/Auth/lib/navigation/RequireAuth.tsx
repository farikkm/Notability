import { JSX, useEffect } from "react";
import { useAuth } from "features/Auth/hooks";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "features/Auth/api";
import { useUserStore } from "entities/User/model";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { checkToken } = useAuth();
  const setEmail = useUserStore((state) => state.setEmail)

  useEffect(() => {
    const verifyToken = async () => {
      const hasToken = await checkToken();
      if (!hasToken) {
        navigate("/login", { replace: true });
      } else {
        navigate("/notes", { replace: true });
        const userInfo = await getUserInfo();
        setEmail(userInfo.email);
      };
    };

    verifyToken();
  }, []);

  return children;
};

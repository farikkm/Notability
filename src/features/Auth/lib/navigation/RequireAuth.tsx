import { JSX, useEffect } from "react";
import { useAuth } from "features/Auth/hooks";
import { useNavigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { checkToken } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      const hasToken = await checkToken();
      if (!hasToken) {
        navigate("/login", { replace: true });
      } else {
        navigate("/notes", { replace: true });
      };

    };

    verifyToken();
  }, []);

  return children;
};

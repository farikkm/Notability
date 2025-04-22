import { JSX, useEffect } from "react";

import { useAuth } from "features/Auth";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { checkToken } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      const hasToken = await checkToken();
      if (!hasToken) navigate("/login");
    };

    verifyToken();
  }, []);

  return children;
};

export default RequireAuth;

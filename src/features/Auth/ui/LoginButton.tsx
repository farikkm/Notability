import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const LoginButton = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login" ? true : false;

  return (
    <Link to={"/login"} className={`icon-text-wrapper ${isLogin ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`}>
      <ArrowLeft />
    </Link>
  );
};

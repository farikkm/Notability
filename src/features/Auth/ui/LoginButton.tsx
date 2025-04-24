import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const LoginButton = () => {
  return (
    <Link to={"/login"} className="icon-text-wrapper">
      <ArrowLeft />
      <span>Login</span>
    </Link>
  );
};

import { LoginForm } from "widgets/auth";
import { AuthLayout } from "shared/ui/layout";
import { useNavigate } from "react-router-dom";
import { useAuthorizedUser } from "features/Auth/hooks/useAuthorizedUser";

const Login = () => {
  // Hooks
  const navigate = useNavigate();
  const userInfo = useAuthorizedUser();

  // Handlers
  const handleCardClick = async () => {
    navigate("/notes");
  };

  return (
    <>
      <AuthLayout
        email={userInfo ? userInfo.email : ""}
        handleCardClick={handleCardClick}
        title="Login"
        description="Login to your account"
      >
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default Login;

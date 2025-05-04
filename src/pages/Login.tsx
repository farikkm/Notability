import { LoginForm } from "widgets/auth";
import { AuthLayout } from "shared/ui/layout";
import { useNavigate } from "react-router-dom";
import { useAuthorizedUser } from "features/Auth/hooks";
import { useTranslation } from "react-i18next";

const Login = () => {
  // Hooks
  const navigate = useNavigate();
  const userInfo = useAuthorizedUser();
  const { t } = useTranslation();

  // Handlers
  const handleCardClick = async () => {
    navigate("/notes");
  };

  return (
    <>
      <AuthLayout
        email={userInfo ? userInfo.email : ""}
        handleCardClick={handleCardClick}
        title={t("login.title")}
        description={t("login.description")}
      >
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default Login;

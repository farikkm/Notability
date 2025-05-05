import { LoginForm } from "widgets/auth";
import { AuthLayout } from "shared/ui/layout";
import { useTranslation } from "react-i18next";
import AuthorizedUserCard from "widgets/user/AuthorizedUserCard";

const Login = () => {
  const { t } = useTranslation();

  return (
    <>
      <AuthLayout title={t("login.title")} description={t("login.description")}>
        <LoginForm />
        <AuthorizedUserCard />
      </AuthLayout>
    </>
  );
};

export default Login;

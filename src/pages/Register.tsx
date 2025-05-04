import { RegisterForm } from "widgets/auth";
import { AuthLayout } from "shared/ui/layout";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  return (
    <AuthLayout title={t("register.title")} description={t("register.description")}>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;

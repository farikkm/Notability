import { RegisterForm } from "widgets/auth";
import { AuthLayout } from "shared/ui/layout";

const Register = () => {
  return (
    <AuthLayout title="Register" description="Create a new account">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;

import { Form, Input, Button, Typography } from "antd";
import { useUserStore } from "entities/User";
import { useAuth } from "features/Auth";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "shared/ui/layout";

const { Text } = Typography;

const Login = () => {
  // States
  const email = useUserStore((state) => state.email);
  const password = useUserStore((state) => state.password);
  const errorMessage = useUserStore((state) => state.errorMessage);
  const emailErrorMessage = useUserStore((state) => state.emailErrorMessage);
  const passwordErrorMessage = useUserStore(
    (state) => state.passwordErrorMessage
  );

  // Actions
  const setEmail = useUserStore((state) => state.setEmail);
  const setPassword = useUserStore((state) => state.setPassword);
  const resetFields = useUserStore((state) => state.resetFields);
  const validateEmail = useUserStore((state) => state.validateEmail);
  const validatePassword = useUserStore((state) => state.validatePassword);
  const clearErrorMessage = useUserStore((state) => state.clearErrorMessage);

  // Hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handlers
  const handleSubmit = async () => {
    clearErrorMessage();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    console.log("Submitting form with data:", { email, password });

    const success = await login(email, password);
    if (success) {
      navigate("/notes");
      resetFields();
      clearErrorMessage();
    }
  };

  return (
    <>
      <AuthLayout title="Login" description="Login to your account">
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ email, password }}
        >
          <Form.Item
            label={<span className="font-bold">Email</span>}
            name="email"
            style={{ marginBottom: 10 }}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          {emailErrorMessage && <Text type="danger">{emailErrorMessage}</Text>}

          <Form.Item
            label={<span className="font-bold">Password</span>}
            name="password"
            style={{ marginBottom: 10 }}
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          {passwordErrorMessage && (
            <Text type="danger">{passwordErrorMessage}</Text>
          )}

          {errorMessage && <Text type="danger">{errorMessage}</Text>}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>

          <Form.Item className="text-center">
            <span>Don't have an account? </span>
            <Link to="/register">Register</Link>
          </Form.Item>
        </Form>
      </AuthLayout>
    </>
  );
};

export default Login;

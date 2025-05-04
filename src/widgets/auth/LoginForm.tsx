import { useAuth } from "features/Auth/hooks";
import { useUserStore } from "entities/User/model";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const LoginForm = () => {
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
  const { t } = useTranslation();

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
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{ email, password }}
      autoComplete="off"
    >
      <Form.Item
        label={<span className="font-bold">{t("login.email-label")}</span>}
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
          autoComplete="off"
        />
      </Form.Item>

      {emailErrorMessage && <Text type="danger">{emailErrorMessage}</Text>}

      <Form.Item
        label={<span className="font-bold">{t("login.password-label")}</span>}
        name="password"
        style={{ marginBottom: 10 }}
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
      </Form.Item>

      {passwordErrorMessage && (
        <Text type="danger">{passwordErrorMessage}</Text>
      )}

      {errorMessage && <Text type="danger">{errorMessage}</Text>}

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {t("login.button")}
        </Button>
      </Form.Item>

      <div className="auth-link">
        <span>{t("login.noAccount")}</span>
        <Link to="/register">{t("login.registerLink")}</Link>
      </div>
    </Form>
  );
};

export { LoginForm };

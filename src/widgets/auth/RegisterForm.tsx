import { useState } from "react";
import { useAuth } from "features/Auth/hooks";
import { useUserStore } from "entities/User/model";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const RegisterForm = () => {
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
  const setErrorMessage = useUserStore((state) => state.setErrorMessage);
  const clearErrorMessage = useUserStore((state) => state.clearErrorMessage);

  // Hooks
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useTranslation();

  // Handlers
  const handleSubmit = async () => {
    clearErrorMessage();
    console.log("Submitting form with data:", {
      email,
      password,
      confirmPassword,
    });

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) return;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const isRegistered = await register(email, password);
    if (isRegistered) {
      navigate("/login");
      resetFields();
      clearErrorMessage();
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        email,
        password,
        confirmPassword,
      }}
      autoComplete="off"
    >
      <Form.Item
        label={<span className="font-bold">{t("register.email-label")}</span>}
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Invalid email format" },
        ]}
        style={{ marginBottom: 10 }}
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
      </Form.Item>
      {emailErrorMessage && <Text type="danger">{emailErrorMessage}</Text>}

      <Form.Item
        label={
          <span className="font-bold">{t("register.password-label")}</span>
        }
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
        style={{ marginBottom: 10 }}
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

      <Form.Item
        label={
          <span className="font-bold">
            {t("register.confirmPassword-label")}
          </span>
        }
        name="confirmPassword"
        rules={[{ required: true, message: "Please confirm your password" }]}
        style={{ marginBottom: 10 }}
      >
        <Input.Password
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="off"
        />
      </Form.Item>

      {errorMessage && <Text type="danger">{errorMessage}</Text>}

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {t("register.button")}
        </Button>
      </Form.Item>

      <div className="auth-link">
        <span>{t("register.hasAccount")}</span>
        <Link to="/login">{t("register.loginLink")}</Link>
      </div>
    </Form>
  );
};

export { RegisterForm };

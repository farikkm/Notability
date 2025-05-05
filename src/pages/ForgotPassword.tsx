import { useState } from "react";
import { Input, Button, message, Form } from "antd";
import { AuthLayout } from "shared/ui/layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      message.error("Введите email");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке запроса");
      }

      message.success("Письмо с инструкциями отправлено!");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Забыли пароль?"
      description="Ничего, сейчас восстановим! ;)"
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ email }}
        autoComplete="off"
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
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPassword;

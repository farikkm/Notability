import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { autoFocusInput } from "shared/lib/form";
import { Form, Button, Input, InputRef, Spin } from "antd";
import { useTranslation } from "react-i18next";

export interface NoteFormValues {
  title: string;
  content: string;
}

interface NoteFormProps {
  title: string;
  content: string;
  buttonValue?: string;
  isModalOpen?: boolean;
  onSubmit: (values: NoteFormValues) => Promise<void>;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  title,
  content,
  onSubmit,
  isModalOpen,
  buttonValue = "Do something with note",
}) => {
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef | null>(null);
  const [serverResponed, setServerResponed] = useState(true);

  const currentTitle = Form.useWatch("title", form);
  const currentContent = Form.useWatch("content", form);

  const fieldsChanged = title !== currentTitle || content !== currentContent;

  const { t } = useTranslation();

  useEffect(() => {
    form.setFieldsValue({ title, content });
    autoFocusInput(inputRef);
  }, [isModalOpen, title, content, form]);

  const handleFinish = async (values: NoteFormValues) => {
    setServerResponed(false);
    await onSubmit(values);
    setServerResponed(true);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label={t("notes.inputs.title")}
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input ref={inputRef} />
      </Form.Item>

      <Form.Item
        label={t("notes.inputs.content")}
        name="content"
        rules={[{ required: true, message: "Please enter some content" }]}
      >
        <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>

      <Form.Item>
        <Button
          htmlType="submit"
          disabled={!serverResponed || !fieldsChanged}
          block
        >
          {!serverResponed ? <Spin /> : buttonValue}
        </Button>
      </Form.Item>
    </Form>
  );
};

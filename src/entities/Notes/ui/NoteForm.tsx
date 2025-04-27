import { useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { autoFocusInput } from "shared/lib/form";
import { Form, Button, Input, InputRef, Spin } from "antd";

export interface NoteFormValues {
  title: string;
  content: string;
}

interface NoteFormProps {
  title: string;
  content: string;
  buttonValue?: string;
  onSubmit: (values: NoteFormValues) => Promise<void>;
}

export const NoteForm: React.FC<NoteFormProps> = ({
  title,
  content,
  onSubmit,
  buttonValue = "Do something with note",
}) => {
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef | null>(null);
  const [serverResponed, setServerResponed] = useState(true);

  useEffect(() => {
    form.setFieldsValue({
      title,
      content,
    });
  }, [title, content]);

  useEffect(() => {
    autoFocusInput(inputRef);
  }, []);

  const handleFinish = async (values: NoteFormValues) => {
    setServerResponed(false);
    await onSubmit(values);
    setServerResponed(true);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input ref={inputRef} />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please enter some content" }]}
      >
        <TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" disabled={!serverResponed} block>
          {!serverResponed ? <Spin /> : buttonValue}
        </Button>
      </Form.Item>
    </Form>
  );
};

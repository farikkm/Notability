import { Form, Button, Input, InputRef } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.input?.select();
    }
  }, []);

  form.setFieldValue("title", title);
  form.setFieldValue("content", content);

  const handleFinish = async (values: NoteFormValues) => {
    await onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} id="add-note">
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
        <Button htmlType="submit" block>
          {buttonValue}
        </Button>
      </Form.Item>
    </Form>
  );
};

import { Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";

export interface NoteFormValues {
  title: string;
  content: string;
}

interface NoteFormProps {
  onSubmit: (values: NoteFormValues) => Promise<void>;
}

export const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: NoteFormValues) => {
    await onSubmit(values); // ждём выполнение
    form.resetFields();     // потом сбрасываем
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      id="add-note"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please enter some content" }]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" block>
          Add Note
        </Button>
      </Form.Item>
    </Form>
  );
};

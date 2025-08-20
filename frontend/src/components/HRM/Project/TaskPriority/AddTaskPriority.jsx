import { useAddTaskPriorityMutation } from "@/redux/rtk/features/hrm/projectManagement/project/priority/priorityApi";
import { Button, Form, Input } from "antd";

export default function AddTaskPriority() {
  const [form] = Form.useForm();
  const [addSingleTaskPriority, { isLoading }] = useAddTaskPriorityMutation();
  const onFinish = async (values) => {
    const taskPriorityData = {
      ...values,
    };

    const resp = await addSingleTaskPriority(taskPriorityData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  return (
    <Form
      form={form}
      style={{ marginBottom: "40px" }}
      eventKey="shift-form"
      name="basic"
      layout="vertical"
      className="m-4 px-10"
      onFinish={onFinish}
      autoComplete="off"
    >
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Task Priority Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Enter Task Priority Name",
            },
          ]}
        >
          <Input placeholder="Enter Task Priority Name" />
        </Form.Item>

        <Form.Item
          className="w-[30%] mx-auto"
        >
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            loading={isLoading}
          >
            Add Task Priority
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

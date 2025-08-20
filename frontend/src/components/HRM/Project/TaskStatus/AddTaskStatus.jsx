import { useGetProjectsQuery } from "@/redux/rtk/features/hrm/projectManagement/project/project/projectApi";
import { useAddTaskStatusMutation } from "@/redux/rtk/features/hrm/projectManagement/project/taskStatus/taskStatusApi";
import { Button, Form, Input, Select } from "antd";
import { useParams } from "react-router-dom";

export default function AddTaskStatus({ isFixed, projectId }) {
  const { IsLoading: projectLoading, data: projectList } =
    useGetProjectsQuery();
  const [addSingleTaskStatus, { isLoading }] = useAddTaskStatusMutation();

  const [form] = Form.useForm();
  const { id } = useParams("id");

  const onFinish = async (values) => {
    const taskStatusData = {
      ...values,
      projectId: !isFixed
        ? values.projectId
        : id
          ? parseInt(id)
          : parseInt(projectId),
    };

    const resp = await addSingleTaskStatus(taskStatusData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  return (
    <>
      <Form
        form={form}
        style={{ margin: "16px" }}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
      >
        <div>
          {isFixed ? (
            <>
              {!projectId && (
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Project"
                  tooltip="Project is already selected "
                  name="projectId"
                  initialValue={id}
                >
                  <Input />
                </Form.Item>
              )}
            </>
          ) : (
            <Form.Item
              style={{ marginBottom: "10px" }}
              label="Project"
              name="projectId"
              rules={[
                {
                  required: true,
                  message: "Select Project",
                },
              ]}
            >
              <Select
                showSearch
                loading={projectLoading}
                placeholder="Select Project"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {projectList?.map((project) => (
                  <Select.Option key={project.id} value={project.id}>
                    {project.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            style={{ marginBottom: "20px" }}
            label="Task Status Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Enter Task Status Name",
              },
            ]}
          >
            <Input placeholder="Enter Task Status Name" />
          </Form.Item>

          <Form.Item style={{ marginBottom: "10px" }}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
            >
              Add Task Status
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}

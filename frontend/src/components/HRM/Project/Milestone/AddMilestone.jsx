import { useAddMilestoneMutation } from "@/redux/rtk/features/hrm/projectManagement/project/milestone/milestoneApi";
import { useGetProjectsQuery } from "@/redux/rtk/features/hrm/projectManagement/project/project/projectApi";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

export default function AddMilestone({ isFixed, projectId }) {
  const { isLoading: loading, data: list } = useGetProjectsQuery();
  const [addSingleMilestone, { isLoading }] = useAddMilestoneMutation();
  const { id } = useParams();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const milestoneData = {
      ...values,
      projectId: !isFixed
        ? values.projectId
        : id
          ? parseInt(id)
          : parseInt(projectId),
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await addSingleMilestone(milestoneData);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  return (
    <>
      <Form
        form={form}
        className="m-4"
        name="basic"
        layout="vertical"
        onFinish={onFinish}
      >
        <div>
          {!isFixed ? (
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
                mode="single"
                disabled={isFixed}
                loading={loading}
                placeholder="Select Project"
                optionFilterProp="children"
              >
                {list?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <>
              {!projectId && (
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Project"
                  tooltip="Your Project is already selected"
                  name="projectId"
                >
                  <Input defaultValue={id} disabled />
                </Form.Item>
              )}
            </>
          )}

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Milestone Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Enter Milestone Name",
              },
            ]}
          >
            <Input placeholder="Enter Milestone Name" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Start Date"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please input Project Start Date!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "20px" }}
            label="End Date"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please input Project End Date!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Milestone Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Enter Milestone Description",
              },
            ]}
          >
            <Input placeholder="Enter Milestone Description" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 6,
              span: 12,
            }}
          >
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              loading={isLoading}
            >
              Add Milestone
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}

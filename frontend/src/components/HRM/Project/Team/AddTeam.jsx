import { useGetProjectsQuery } from "@/redux/rtk/features/hrm/projectManagement/project/project/projectApi";
import { useAddProjectTeamMutation } from "@/redux/rtk/features/hrm/projectManagement/project/projectTeam/projectTeamApi";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddTeam({ projectId }) {
  const dispatch = useDispatch();
  const { list: usersList, loading: userListLoading } = useSelector(
    (state) => state.users
  );

  const { data: projectList, isLoading: projectListLoading } =
    useGetProjectsQuery();

  const [addSingleProjectTeam, { isLoading: addLoading }] =
    useAddProjectTeamMutation();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const singleProjectTeam = {
      ...values,
      projectId: values.projectId ? values.projectId : parseInt(projectId),
    };

    const resp = await addSingleProjectTeam(singleProjectTeam);

    if (resp.data && !resp.error) {
      form.resetFields();
    }
  };

  useEffect(() => {
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  return (
    <>
      <Form
        form={form}
        eventKey="shift-form"
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="m-4">
        <div>
          {!projectId && (
            <Form.Item
              label="Project Name"
              name="projectId"
              style={{ marginBottom: "10px" }}
              rules={[
                {
                  required: !projectId,
                  message: "Select Project",
                },
              ]}>
              <Select
                loading={projectListLoading}
                showSearch
                allowClear
                placeholder="Select Project"
                optionFilterProp="children">
                {projectList?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Team Name"
            name="projectTeamName"
            rules={[
              {
                required: true,
                message: "Input Team Name",
              },
            ]}>
            <Input placeholder="Team Name" />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "20px" }}
            label="Team Members"
            name="projectTeamMember"
            rules={[
              {
                required: true,
                message: "Select Team Member/s",
              },
            ]}>
            <Select
              mode="multiple"
              maxTagCount="responsive"
              loading={userListLoading}
              placeholder="Select Team Member/s"
              optionFilterProp="children">
              {usersList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.firstName + " " + item.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 7,
              span: 12,
            }}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              loading={addLoading}>
              Create Team
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}

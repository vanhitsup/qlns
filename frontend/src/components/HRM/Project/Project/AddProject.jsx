import { useAddProjectMutation } from "@/redux/rtk/features/hrm/projectManagement/project/project/projectApi";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddProject() {
  const dispatch = useDispatch();
  const { list, loading: listLoading } = useSelector((state) => state.users);
  const [addSingleProject, { isLoading }] = useAddProjectMutation();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const projectData = {
      ...values,
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await addSingleProject(projectData);

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
        name='basic'
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
        className='mx-4'
      >
        <div>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Project Manager'
            name='projectManagerId'
            rules={[
              {
                required: true,
                message: "Select Project Manager",
              },
            ]}
          >
            <Select
              loading={listLoading}
              mode='single'
              showSearch
              placeholder='Select Project Manager'
              optionFilterProp='children'
            >
              {list?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.firstName} {item.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Project Name'
            name='name'
            rules={[
              {
                required: true,
                message: "Enter Project Name",
              },
            ]}
          >
            <Input placeholder='Enter Project Name' />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Start Date'
            name='startDate'
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
            label='End Date'
            name='endDate'
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
            style={{ marginBottom: "20px" }}
            label='Project Description'
            name='description'
            rules={[
              {
                required: true,
                message: "Enter Project Description",
              },
            ]}
          >
            <Input.TextArea placeholder='Enter Project Description' />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 7,
              span: 12,
            }}
          >
            <Button
              type='primary'
              size='large'
              htmlType='submit'
              block
              loading={isLoading}
            >
              Add Project
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}

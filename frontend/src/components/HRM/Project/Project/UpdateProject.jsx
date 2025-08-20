import Loader from "@/components/Loader/Loader";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/rtk/features/hrm/projectManagement/project/project/projectApi";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProject({ drawer }) {
  const projectId = useParams("id").id;
  const dispatch = useDispatch();
  const { list: userList, loading: isLoading } = useSelector(
    (state) => state.users
  );
  const { data: project } = useGetProjectQuery(projectId);
  const [updateSingleProject, { isLoading: addLoading }] =
    useUpdateProjectMutation();
  const [initialState, setInitialState] = useState(null);

  useEffect(() => {
    if (project) {
      setInitialState({
        ...project,
        startDate: dayjs(project.startDate),
        endDate: dayjs(project.endDate),
      });
    }
  }, [project]);

  const { Title } = Typography;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const projectData = {
      ...values,
      startDate: dayjs(values.startDate).format(),
      endDate: dayjs(values.endDate).format(),
    };

    const resp = await dispatch(
      updateSingleProject({ id: projectId, values: projectData })
    );

    if (resp) {
      form.resetFields();
      navigate(-1);
    }
  };

  useEffect(() => {
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  return (
    <>
      <Row className='mt-[25px]' justify={drawer ? "center" : "center"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={drawer ? 22 : 18}
          xl={drawer ? 22 : 16}
          className='column-design border rounded card-custom'
        >
          <Title level={4} className='m-2 mt-5 mb-5 text-center'>
            Update Project
          </Title>
          {initialState ? (
            <Form
              form={form}
              style={{ marginBottom: "40px" }}
              eventKey='shift-form'
              name='basic'
              initialValues={initialState}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 12,
              }}
              onFinish={onFinish}
              autoComplete='off'
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
                    loading={isLoading}
                    mode='single'
                    showSearch
                    placeholder='Select Project Manager'
                    optionFilterProp='children'
                  >
                    {userList?.map((item) => (
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
                    offset: 8,
                    span: 12,
                  }}
                >
                  <Button
                    type='primary'
                    size='large'
                    htmlType='submit'
                    block
                    loading={addLoading}
                  >
                    Update Project
                  </Button>
                </Form.Item>
              </div>
            </Form>
          ) : (
            <Loader />
          )}
        </Col>
      </Row>
    </>
  );
}

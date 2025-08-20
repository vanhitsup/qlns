import Loader from "@/components/Loader/Loader";
import { useGetProjectQuery, useUpdateProjectMutation } from "@/redux/rtk/features/hrm/projectManagement/project/project/projectApi";
import { Button, Col, Form, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function UpdateStatus(){
  const projectId = useParams("id").id;
  const [initialValues, setInitialValues] = useState(null);
  const { data: project } = useGetProjectQuery(projectId);
  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  useEffect(() => {
    if (project) {
      setInitialValues(project);
    }
  }, [project]);

  const { Title } = Typography;
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const resp = await updateProject({ id: projectId, values: values });

    if (resp) {
      form.resetFields();
      navigate(-1);
    }
  };

 
  return (
    <>
   
      <Row className="mt-[25px]">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={18}
          xl={16}
          className="column-design border rounded card-custom"
        >
          <Title level={4} className="m-2 mt-5 mb-5 text-center">
            Update Status
          </Title>
          {initialValues ? (
            <Form
              form={form}
              style={{ marginBottom: "40px" }}
              eventKey="shift-form"
              name="basic"
              initialValues={initialValues}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 12,
              }}
              onFinish={onFinish}
             
              autoComplete="off"
            >
              <div>
                <Form.Item
                  style={{ marginBottom: "20px" }}
                  label="Status"
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "Select Status Name",
                    },
                  ]}
                >
                  <Select placeholder="Select Status Name">
                    <Select.Option value="PROGRESS">PROGRESS</Select.Option>
                    <Select.Option value="COMPLETE">COMPLETE</Select.Option>
                    <Select.Option value="ONHOLD">ONHOLD</Select.Option>
                    <Select.Option value="DELETED">DELETED</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 8,
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
                    Update Now
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

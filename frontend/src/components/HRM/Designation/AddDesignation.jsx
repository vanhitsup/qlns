import UploadMany from "@/components/Card/UploadMany";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import {
  addDesignation,
  loadAllDesignation,
} from "@/redux/rtk/features/hrm/designation/designationSlice";
import { Button, Card, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddDesignation = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [loader, setLoader] = useState(false);
  const onClickLoading = () => {
    setLoader(true);
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addDesignation(values));
      if (resp.payload.message === "success") {
        setLoader(false);
        form.resetFields();
        dispatch(loadAllDesignation({ page: 1, count: 10, status: true }));
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const onFinishFailed = () => {
    setLoader(false);
  };

  return (
    <>
      <div className="h-full ">
        <Title level={4} className="text-center">
          Create New Designation
        </Title>
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className="sm:mx-10">
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input designation name!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item style={{ marginBottom: "10px", textAlign: "center" }}>
            <Button
              onClick={onClickLoading}
              type="primary"
              htmlType="submit"
              shape="round"
              loading={loader}>
              Create New designation
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Card
        className="mt-5"
        title={<span className="text-center font-bold">Import From CSV</span>}>
        <UploadMany
          title={"Demo Designation"}
          demoData={[["name"], ["Manager"], ["Sales man"], ["Employee"]]}
          urlPath={"designation"}
          loadAllThunk={loadAllDesignation}
          query={{ page: 1, count: 10, status: true }}
        />
      </Card>
    </>
  );
};

export default AddDesignation;

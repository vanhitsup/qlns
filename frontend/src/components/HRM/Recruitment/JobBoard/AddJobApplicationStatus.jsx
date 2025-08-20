import {
  addJobApplicationStatus,
  loadAllJobApplicationStatus,
} from "@/redux/rtk/features/hrm/jobApplicationStatus/jobApplicationStatusSlice";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const AddJobApplicationStatus = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const onFinish = async (values) => {
    setLoader(true);
    try {
      const resp = await dispatch(addJobApplicationStatus(values));

      if (resp.payload.message === "success") {
        form.resetFields();
        dispatch(loadAllJobApplicationStatus());
      }
      setLoader(false);
    } catch (err) {}
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Failed at adding job Application Status");
  };

  return (
    <Form
      style={{ marginBottom: "40px" }}
      form={form}
      eventKey={"jobApplicationStatus-form"}
      name="basic"
      className="mx-4"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Application Status"}
          name={"applicationStatus"}
          rules={[
            {
              required: true,
              message: "please Input Application Status",
            },
          ]}>
          <Input placeholder="HIRED" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          wrapperCol={{
            offset: 6,
            span: 12,
          }}>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            block
            loading={loader}>
            Add Application Status
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddJobApplicationStatus;

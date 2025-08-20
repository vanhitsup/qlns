import {
  addLeavePolicy,
  loadAllLeavePolicyPaginated,
} from "@/redux/rtk/features/hrm/leavePolicy/leavePolicySlice";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddLeavePolicy() {
  const [loader, setLoader] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoader(false);
    try {
      const resp = await dispatch(addLeavePolicy(values));
      if (resp.payload.message === "success") {
        form.resetFields();
        dispatch(
          loadAllLeavePolicyPaginated({
            page: 1,
            count: 10,
            status: "true",
          })
        );
      }
      setLoader(false);
    } catch (err) {}
  };
  return (
    <div>
      <Form
        style={{ marginBottom: "40px" }}
        form={form}
        eventKey="department-form"
        name="basic"
        layout="vertical"
        className="mx-4"
        onFinish={onFinish}
        autoComplete="off">
        <div>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your leave-policy name!",
              },
            ]}>
            <Input placeholder="Policy 10-12" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Paid Leave "
            name="paidLeaveCount"
            rules={[
              {
                required: true,
                message: "Please input your paid leave!",
              },
            ]}>
            <Input placeholder="20" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Unpaid Leave "
            name="unpaidLeaveCount"
            rules={[
              {
                required: true,
                message: "Please input your unpaid Leave !",
              },
            ]}>
            <Input placeholder="10" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className="flex justify-center">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              loading={loader}>
              Add Policy
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

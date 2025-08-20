import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  addLeave,
  loadAllLeavePaginated,
} from "@/redux/rtk/features/hrm/leave/leaveSlice";
import { Button, DatePicker, Form, Input, Select, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddLeave() {
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    setLoader(true);
    try {
      const leaveData = {
        ...values,
        userId: id,
        leaveFrom: dayjs(values.leaveFrom).format(),
        leaveTo: dayjs(values.leaveTo).format(),
      };
      const resp = await dispatch(addLeave(leaveData));
      if (resp.payload.message == "success") {
        form.resetFields();
        dispatch(
          loadAllLeavePaginated({
            page: 1,
            count: 10,
          })
        );
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  const { Title } = Typography;

  return (
    <div>
      <UserPrivateComponent permission={"create-leaveApplication"}>
        <Title level={4} className="m-2 mt-5 mb-5 text-center">
          Application for Leave
        </Title>
        <Form
          form={form}
          style={{ margin: "40px" }}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off">
          <div>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label="Leave Type"
              name="leaveType"
              rules={[
                {
                  required: true,
                  message: "Please input your leave type!",
                },
              ]}>
              <Select
                mode="single"
                placeholder="Select leave type"
                optionFilterProp="children">
                <Select.Option value="PAID">PAID</Select.Option>
                <Select.Option value="UNPAID">UNPAID</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label="Start Date"
              name="leaveFrom"
              rules={[
                {
                  required: true,
                  message: "Please input your start date!",
                },
              ]}>
              <DatePicker />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "20px" }}
              label="End Date"
              name="leaveTo"
              rules={[
                {
                  required: true,
                  message: "Please input your end date!",
                },
              ]}>
              <DatePicker />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "20px" }}
              label="Reason"
              name="reason">
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              className="flex justify-center">
              <Button type="primary" htmlType="submit" loading={loader}>
                Submit Leave
              </Button>
            </Form.Item>
          </div>
        </Form>
      </UserPrivateComponent>
    </div>
  );
}

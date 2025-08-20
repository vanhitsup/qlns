import {
  addWeeklyHoliday,
  loadAllWeeklyHolidayPaginated,
} from "@/redux/rtk/features/hrm/holiday/weeklyHolidaySlice";
import { Button, Form, Input, Select, Typography } from "antd";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
const AddWeeklyHoliday = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const onFinish = async (values) => {
    setLoader(true);
    try {
      const resp = await dispatch(addWeeklyHoliday(values));
      if (resp.payload.message === "success") {
        form.resetFields();
        dispatch(
          loadAllWeeklyHolidayPaginated({
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
    <Form
      style={{ marginBottom: "40px" }}
      form={form}
      eventKey="department-form"
      name="basic"
      className="mx-4"
      layout="vertical"
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
              message: "Please input name!",
            },
          ]}>
          <Input placeholder="Saturday-Friday" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Start Day"
          name="startDay"
          rules={[
            {
              required: true,
              message: "Please input start day!",
            },
          ]}>
          <Select size="middle" placeholder="Select Start Day">
            <Select.Option value="Saturday">Saturday</Select.Option>
            <Select.Option value="Sunday">Sunday</Select.Option>
            <Select.Option value="Monday">Monday</Select.Option>
            <Select.Option value="Tuesday">Tuesday</Select.Option>
            <Select.Option value="Wednesday">Wednesday</Select.Option>
            <Select.Option value="Thursday">Thursday</Select.Option>
            <Select.Option value="Friday">Friday</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label="End Day"
          name="endDay"
          rules={[
            {
              required: true,
              message: "Please input End day!",
            },
          ]}>
          <Select size="middle" placeholder="Select Start Day">
            <Select.Option value="Saturday">Saturday</Select.Option>
            <Select.Option value="Sunday">Sunday</Select.Option>
            <Select.Option value="Monday">Monday</Select.Option>
            <Select.Option value="Tuesday">Tuesday</Select.Option>
            <Select.Option value="Wednesday">Wednesday</Select.Option>
            <Select.Option value="Thursday">Thursday</Select.Option>
            <Select.Option value="Friday">Friday</Select.Option>
          </Select>
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
            Add Weekly Holiday
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddWeeklyHoliday;

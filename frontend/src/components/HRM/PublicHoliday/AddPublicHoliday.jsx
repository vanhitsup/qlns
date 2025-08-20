import {
  addPublicHoliday,
  loadAllPublicHolidayPaginated,
} from "@/redux/rtk/features/hrm/holiday/publicHolidaySlice";
import { Button, DatePicker, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddPublicHoliday = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const onFinish = async (values) => {
    setLoader(true);
    try {
      const startDate = values.date[0];
      const endDate = values.date[1];
      const data = {
        name: values.name,
        startDate: startDate,
        endDate: endDate,
      };
      const resp = await dispatch(addPublicHoliday(data));
      if (resp.payload.message === "success") {
        form.resetFields();
        dispatch(
          loadAllPublicHolidayPaginated({
            page: 1,
            count: 10,
            status: "true",
          }),
        );
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      style={{ marginBottom: "40px" }}
      form={form}
      eventKey="department-form"
      name="basic"
      layout="vertical"
      className="mx-4"
      onFinish={onFinish}
      autoComplete="off"
    >
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
          ]}
        >
          <Input placeholder="New Year" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "20px" }}
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input date!",
            },
          ]}
        >
          <DatePicker.RangePicker />
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
            loading={loader}
          >
            Add Public Holiday
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddPublicHoliday;

import {
  addAnnouncement,
  loadAllAnnouncementPaginated,
} from "@/redux/rtk/features/hrm/announcement/announcementSlice";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddAnnouncement() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoader(true);
    try {
      const resp = await dispatch(addAnnouncement(values));
      if (resp.payload.message === "success") {
        form.resetFields();
        dispatch(
          loadAllAnnouncementPaginated({
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
    <div>
      <Form
        form={form}
        style={{ marginBottom: "40px" }}
        eventKey="shift-form"
        name="basic"
        className="mx-4"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input placeholder="Meeting at 00:00" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "20px" }}
            label="Description"
            name={"description"}
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <Input.TextArea placeholder="Description" />
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
              block
              htmlType="submit"
              loading={loader}
            >
              Add Announcement
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

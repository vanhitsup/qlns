import {
  addAnnouncement,
  loadAllAnnouncementPaginated,
  loadSingleAnnouncement,
  updateAnnouncement,
} from "@/redux/rtk/features/hrm/announcement/announcementSlice";
import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function UpdateAnnouncement({ data, handleCancel }) {
  const { id } = data;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { announcement } = useSelector((state) => state.announcement);

  useEffect(() => {
    dispatch(loadSingleAnnouncement(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (announcement) {
      form.setFieldsValue({
        title: announcement?.title,
        description: announcement?.description,
      });
    }
  }, [announcement, form]);

  const onFinish = async (values) => {
    await dispatch(updateAnnouncement({ id: id, values: values }));
    await dispatch(
      loadAllAnnouncementPaginated({
        page: 1,
        count: 10,
        status: "true",
      })
    );
    handleCancel();
    setLoading(false);
  };

  const onFinishFailed = () => {
    setLoading(false);
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
        onFinishFailed={onFinishFailed}
        autoComplete="off">
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
            ]}>
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
            ]}>
            <Input.TextArea placeholder="Description" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 6,
              span: 12,
            }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Announcement
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

// UpdateAnnouncement

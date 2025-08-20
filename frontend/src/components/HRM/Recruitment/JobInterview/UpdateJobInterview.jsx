import { loadAllJobApplication } from "@/redux/rtk/features/hrm/jobApplication/jobApplicationSlice";
import { updateJobInterview } from "@/redux/rtk/features/hrm/jobInterview/jobInterviewSlice";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";
import { Button, DatePicker, Form, Input, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UpdateJobInterview = ({ handleCancel }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { edit } = useSelector((state) => state.jobInterview);
  const { list: jobApplicationList, loading: jobApplicationLoading } =
    useSelector((state) => state.jobApplication);
  const { list: userList, loading: userLoading } = useSelector(
    (state) => state.users
  );
  const { id } = useParams();

  const onFinish = async (values) => {
    setLoader(true);
    try {
      values.scheduleDate = dayjs(values.scheduleDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      values.scheduleTime = dayjs(values.scheduleTime).format("HH:mm:ss");

      const resp = await dispatch(
        updateJobInterview({ id: edit.id, values: values })
      );
      if (resp.payload.message === "success") {
        form.resetFields();
        handleCancel();
      }
      setLoader(false);
    } catch (err) {}
  };

  useEffect(() => {
    dispatch(loadAllJobApplication());
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  useEffect(() => {
    form.setFieldValue("jobApplicationId", edit.jobApplicationId);
    // form.setFieldValue("scheduleDate", dayjs(edit.scheduleDate).format("YYYY-MM-DD HH:mm:ss"));
    form.setFieldValue("comment", edit.comment);
    form.setFieldValue("assignedMembers", edit.assignedMembers);
  }, [form, edit]);

  return (
    <Form
      style={{ marginBottom: "40px" }}
      form={form}
      eventKey={"jobInterview-form"}
      name="basic"
      className="mx-4"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off">
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Job Applicant"}
          name={"jobApplicationId"}
          rules={[
            {
              required: true,
              message: "please Input Job Applicant!",
            },
          ]}>
          <Select
            loading={jobApplicationLoading}
            size="middle"
            mode="single"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select Job Applicant">
            {jobApplicationList &&
              jobApplicationList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}- {item.id}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Schedule Date"}
          name={"scheduleDate"}
          rules={[
            {
              required: true,
              message: "please Input Job Interview Schedule Date",
            },
          ]}>
          <DatePicker format={"YYYY-MM-DD"} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Schedule Time"}
          name={"scheduleTime"}
          rules={[
            {
              required: true,
              message: "please Input Job Interview Schedule Time",
            },
          ]}>
          <TimePicker format={"HH:mm:s"} />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Comment"}
          name={"comment"}
          rules={[
            {
              required: true,
              message: "please Input Job Interview comment",
            },
          ]}>
          <Input placeholder="please input comment here" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "12px" }}
          label="Assign Member"
          name="assignedMembers"
          rules={[
            {
              required: true,
              message: "Please input Assign member!",
            },
          ]}>
          <Select
            mode="multiple"
            loading={userLoading}
            style={{
              width: "100%",
            }}
            placeholder="select member"
            optionLabelProp="children">
            {userList &&
              userList.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.username}
                </Option>
              ))}
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
            Update Job Interview
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default UpdateJobInterview;

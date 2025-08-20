import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllJobApplicationPaginated,
  updateJobApplication,
} from "@/redux/rtk/features/hrm/jobApplication/jobApplicationSlice";
import { loadAllJob } from "@/redux/rtk/features/hrm/job/jobSlice";
import { useParams } from "react-router-dom";

const UpdateJobApplication = () => {
  const dispatch = useDispatch();
  const { Option } = Select;
  const [loader, setLoader] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams("id");

  const { list: jobList, loading: jobLoading } = useSelector(
    (state) => state.job,
  );
  const { edit } = useSelector((state) => state.jobApplication);

  const onFinish = async (values) => {
    setLoader(true);

    try {
      const formData = new FormData();
      formData.append("jobId", values.jobId);
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("coverLater", values.coverLater);
      formData.append("_method", "PUT");

      // request send for api response
      const resp = await dispatch(
        updateJobApplication({ id: edit.id, values: formData }),
      );
      if (resp.payload.message === "success") {
        form.resetFields();
        loadAllJobApplicationPaginated({
          page: 1,
          count: 10,
          status: "true",
        });
      }

      setLoader(false);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(loadAllJob());
  }, [dispatch]);

  useEffect(() => {
    form.setFieldValue("jobId", edit.jobId);
    form.setFieldValue("name", edit.name);
    form.setFieldValue("email", edit.email);
    form.setFieldValue("phone", edit.phone);
    form.setFieldValue("address", edit.address);
    form.setFieldValue("coverLater", edit.coverLater);
  }, [form, edit]);

  return (
    <Form
      style={{ marginBottom: "40px" }}
      form={form}
      eventKey={"jobApplication-form"}
      name="basic"
      className="mx-4"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <div>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Job"}
          name={"jobId"}
          rules={[
            {
              required: true,
              message: "please Select Job",
            },
          ]}
        >
          <Select
            loading={jobLoading}
            size="middle"
            mode="single"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select Job"
          >
            {jobList &&
              jobList.map((job) => (
                <Option key={job.id} value={job.id}>
                  {job.jobTitle}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Candidate Name"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "please Input Candidate Name",
            },
          ]}
        >
          <Input placeholder="Mr. XYZ" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Email"}
          name={"email"}
          rules={[
            {
              required: true,
              type: "email",
              message: "please Input Email",
            },
          ]}
        >
          <Input placeholder="example@gmail.com" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Phone"}
          name={"phone"}
          rules={[
            {
              required: true,
              message: "please Input Phone",
            },
          ]}
        >
          <Input placeholder="018*******9" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Address"}
          name={"address"}
          rules={[
            {
              required: true,
              message: "please Input Address",
            },
          ]}
        >
          <Input placeholder="Dhaka, Bangladesh" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Cover Letter"}
          name={"coverLater"}
        >
          <Input.TextArea rows={4} />
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
            Update Job Application
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default UpdateJobApplication;

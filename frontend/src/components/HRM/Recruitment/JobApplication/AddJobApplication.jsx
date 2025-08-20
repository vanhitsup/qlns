import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addJobApplication,
  loadAllJobApplicationPaginated,
} from "@/redux/rtk/features/hrm/jobApplication/jobApplicationSlice";
import { loadAllJob } from "@/redux/rtk/features/hrm/job/jobSlice";

const AddJobApplication = () => {
  const dispatch = useDispatch();
  const { Option } = Select;
  const [loader, setLoader] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { list: jobList, loading: jobLoading } = useSelector(
    (state) => state.job
  );

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
      if (fileList.length) {
        formData.append("files[]", fileList[0].originFileObj);
      }
      // request send for api response
      const resp = await dispatch(addJobApplication(formData));
      if (resp.payload.message === "success") {
        form.resetFields();
        setFileList([]);
        dispatch(
          loadAllJobApplicationPaginated({
            page: 1,
            count: 10,
            status: "true",
          })
        );
      }
      setLoader(false);
    } catch (error) {}
  };
  const handelImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // useEffect(() => {
  //   dispatch(loadAllJob());
  // }, [dispatch]);
  return (
    <Form
      style={{ marginBottom: "40px" }}
      form={form}
      eventKey={"jobApplication-form"}
      name="basic"
      className="mx-4"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off">
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
          ]}>
          <Select
            loading={jobLoading}
            size="middle"
            mode="single"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select Job">
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
          ]}>
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
          ]}>
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
          ]}>
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
          ]}>
          <Input placeholder="Dhaka, Bangladesh" />
        </Form.Item>

        <Form.Item
          label="Upload CV or Resume"
          valuePropName="fileList"
          rules={[
            {
              required: true,
              message: "upload your cv or resume",
            },
          ]}>
          <Upload
            accept=".pdf"
            listType="picture-card"
            beforeUpload={() => false}
            name="files[]"
            fileList={fileList}
            maxCount={1}
            onChange={handelImageChange}>
            <div>
              <UploadOutlined />
              <div
                style={{
                  marginTop: 8,
                }}>
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          label={"Cover Letter"}
          name={"coverLater"}>
          <Input.TextArea rows={4} />
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
            Add Job Application
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddJobApplication;

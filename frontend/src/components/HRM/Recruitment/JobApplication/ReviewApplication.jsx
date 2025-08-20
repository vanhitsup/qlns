import {
  loadSingleJobApplication,
  updateJobApplication,
} from "@/redux/rtk/features/hrm/jobApplication/jobApplicationSlice";
import { loadAllJobApplicationStatus } from "@/redux/rtk/features/hrm/jobApplicationStatus/jobApplicationStatusSlice";
import { Button, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ReviewApplication({ data }) {
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const { jobApplicationStatus } = useSelector(
    (state) => state.jobApplicationStatus
  );

  const onFinish = async (values) => {
    setLoader(true);
    try {
      const resp = await dispatch(
        updateJobApplication({ id: data?.id, values: values })
      );
      if (resp.payload.message === "success") {
        dispatch(loadSingleJobApplication(data.id));
      }
      setLoader(false);
    } catch (err) {}
  };

  useEffect(() => {
    dispatch(loadAllJobApplicationStatus());
  }, [dispatch]);

  useEffect(() => {
    data &&
      form.setFieldValue("applicationStatusId", data.jobApplicationStatus.id);
  }, [data, form]);
  return (
    <div>
      <Form
        style={{ marginBottom: "40px" }}
        form={form}
        eventKey={"jobApplicationReview-form"}
        name="basic"
        className="mx-4"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off">
        <div>
          <div className="flex justify-center my-4">
            <ul className="list-inside list-none w-full uppercase">
              <li className="text-sm text-gray-600/60 font-semibold py-2 px-4 bg-gray-400/10 mb-1.5 rounded  flex justify-start">
                Candidate Name :{" "}
                <p className="ml-2 text-sm text-gray-800/80">{data?.name} </p>
              </li>
              <li className="text-sm text-gray-600/60 font-semibold py-2 px-4 bg-gray-400/10 mb-1.5 rounded  flex justify-start">
                Applied For :{" "}
                <p className="ml-2 text-sm text-gray-800/80">
                  {data?.job.jobTitle}{" "}
                </p>
              </li>
            </ul>
          </div>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label={"Application Status"}
            name={"applicationStatusId"}
            rules={[
              {
                required: true,
                message: "please Select Application Status",
              },
            ]}>
            <Select
              size="middle"
              mode="single"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select Application Status">
              {jobApplicationStatus &&
                jobApplicationStatus.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.applicationStatus}
                  </Select.Option>
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
              Review
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

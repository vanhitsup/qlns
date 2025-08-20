import { loadAllDesignation } from "@/redux/rtk/features/hrm/designation/designationSlice";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addDesignationHistory,
  updateDesignationHistory,
} from "../../../../redux/rtk/features/hrm/designationHistory/designationHistorySlice";
import { loadSingleStaff } from "../../../../redux/rtk/features/hrm/user/userSlice";

const DesignationAddSinglePopup = ({ edit, data, onCancel }) => {
  const [loader, setLoader] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.designations);

  const userId = useParams("id");
  const onFinish = async (values) => {
    setLoader(true);
    const infoData = {
      ...values,
      userId: parseInt(userId.id),
      designationId: parseInt(values.designationId),
    };

    const resp = await dispatch(
      edit
        ? updateDesignationHistory({ id: data?.id, values: infoData })
        : addDesignationHistory(infoData)
    );

    if (resp.payload.message === "success") {
      setLoader(false);
      form.resetFields();
      onCancel && onCancel();
      dispatch(loadSingleStaff(userId?.id));
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Failed at adding department");
  };

  useEffect(() => {
    dispatch(loadAllDesignation({}));
  }, [dispatch]);

  useEffect(() => {
    if (edit && data) {
      form.setFieldsValue({
        designationId: data.designationId,
        designationStartDate: data.startDate
          ? dayjs(data.startDate.slice(0, 10))
          : "",
        designationEndDate: data.endDate
          ? dayjs(data.endDate.slice(0, 10))
          : "",
        designationComment: data.comment,
      });
    }
  }, [data, edit, form]);

  return (
    <>
      <Form
        form={form}
        className='mx-10 mt-10'
        layout='vertical'
        eventKey='department-form'
        name='basic'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <div>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Designation'
            name='designationId'
            rules={[
              {
                required: true,
                message: "Please input your Designation!",
              },
            ]}
          >
            <Select loading={loading} placeholder='Select Designation'>
              {list?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name || ""}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Start Date'
            name='designationStartDate'
            rules={[
              {
                required: true,
                message: "Please input your start date!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label='End Date'
            name='designationEndDate'
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label='Comment'
            name='designationComment'
          >
            <Input placeholder='Comment' />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "20px" }}
            wrapperCol={{
              offset: 6,
              span: 12,
            }}
          >
            <Button
              type='primary'
              size='small'
              htmlType='submit'
              block
              loading={loader}
            >
              Add Now
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};
export default DesignationAddSinglePopup;

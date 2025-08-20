import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { addSalaryHistory } from "../../../../redux/rtk/features/hrm/salaryHistory/salaryHistorySlice";
import { loadSingleStaff } from "../../../../redux/rtk/features/hrm/user/userSlice";

const SalaryAddSinglePopup = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const userId = useParams("id");

  const onFinish = async (values) => {
    setLoading(true);
    const infoData = {
      ...values,
      userId: parseInt(userId.id),
      salary: parseInt(values.salary),
    };

    const resp = await dispatch(addSalaryHistory(infoData));

    if (resp.payload.message === "success") {
      setLoading(false);
      form.resetFields();
      dispatch(loadSingleStaff(userId?.id));
    } else {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Failed at adding department");

    setLoading(false);
  };
  
  return (
    <>
   
        <Form
          form={form}
          style={{ marginBottom: "10px" }}
          className='mx-10 mt-10'
          eventKey='department-form'
          name='basic'
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <div>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Salary'
              name='salary'
            >
              <Input placeholder='Salary' />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Start Date'
              name='salaryStartDate'
              valuePropName='salaryStartDate'
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
              name='salaryEndDate'
              valuePropName='salaryEndDate'
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label='Comment'
              name='salaryComment'
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
                loading={loading}
              >
                Add Now
              </Button>
            </Form.Item>
          </div>
        </Form>
    </>
  );
};
export default SalaryAddSinglePopup;

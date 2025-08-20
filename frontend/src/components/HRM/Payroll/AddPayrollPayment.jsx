import Payments from "@/components/Payment/Payments";
import { Button, Card, DatePicker, Form, Input, Typography } from "antd";
import dayjs from "dayjs";
import PayrollPayment from "./PayrollPayment";
import { useAddPaymentMutation } from "@/redux/rtk/features/hrm/payment/paymentApi";

export default function AddPayrollPayment({ data, onClose }) {
  const { id, totalDueAmount } = data || {};
  const { Title } = Typography;
  const [form] = Form.useForm();

  const [addPayslipPayment, { isLoading: loading }] = useAddPaymentMutation();

  const userId = localStorage.getItem("id");
  const onFinish = async (values) => {
    try {
      const data = {
        ...values,
        userId: parseInt(userId),
        paidAmount: values.paidAmount || [],
      };
      await addPayslipPayment({ values: data, id: id });
      form.resetFields();
      onClose && onClose();
    } catch (error) {}
  };

  return (
    <>
      <Card bordered={false} className=" max-w-[700px] ">
        <Title level={3} className="m-3 text-center">
          Invoice Payment
        </Title>
        <Title level={4} className="text-center">
          Due Amount :{" "}
          <strong style={{ color: "red" }}>
            $ {totalDueAmount?.toLocaleString() || 0}
          </strong>
        </Title>
        <Form
          form={form}
          className="m-4"
          name="basic"
          layout="vertical"
          initialValues={{
            invoiceId: id,
            paidAmount: [{}],
            date: dayjs(),
          }}
          onFinish={onFinish}
          autoComplete="off">
          <Form.Item
            label="Date"
            rules={[
              {
                required: true,
                message: "Please input the date!",
              },
            ]}
            name="date"
            style={{ marginBottom: "10px" }}>
            <DatePicker popupClassName="z-[9999]" />
          </Form.Item>
          <span>
            Paid Amount
            {totalDueAmount && (
              <button
                type="button"
                onClick={() =>
                  form.setFieldsValue({
                    paidAmount: [{ amount: totalDueAmount }],
                  })
                }
                className="ml-3 bg-blue-200 rounded px-1">
                Full Paid
              </button>
            )}
          </span>
          <Payments />

          <Form.Item
            style={{ marginBottom: "10px" }}
            wrapperCol={{
              offset: 8,
              span: 16,
            }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              shape="round"
              loading={loading}>
              Pay Now
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

//  AddPayrollPayment;

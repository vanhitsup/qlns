import Payments from "@/components/Payment/Payments";
import { Button, Card, DatePicker, Form, Input, Typography } from "antd";
import dayjs from "dayjs";
import PayrollPayment from "./PayrollPayment";
import { useAddPaymentMutation } from "@/redux/rtk/features/hrm/payment/paymentApi";
import { useNavigate } from "react-router-dom";
import { useAddPayrollMutation } from "@/redux/rtk/features/hrm/payroll/payrollApi";

export default function AddGenerateSlip({
  onClose,
  payslips,
  selectedRowKeys,
  pageConfig,
  setPageConfig,
}) {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [addPayslip, { isLoading: addLoading }] = useAddPayrollMutation();

  const onMonthChange = (date, dateString) => {
    setPageConfig((prev) => ({
      ...prev,
      salaryMonth: dateString,
    }));
  };

  const onYearChange = (date, dateString) => {
    setPageConfig((prev) => ({
      ...prev,
      salaryYear: dateString,
    }));
  };

  const navigate = useNavigate();
  const OnSubmit = async () => {
    if (!selectedRowKeys) {
      alert("Please select a slip");
      return;
    }
    const selectedPayslipData = payslips.filter(
      (payslip) => selectedRowKeys.includes(payslip.id) // Only include the payslips with IDs in selectedRowKeys
    );

    console.log(selectedPayslipData);
    try {
      const resp = await addPayslip({
        values: selectedPayslipData,
        month: pageConfig.salaryMonth,
        year: pageConfig.salaryYear,
      });

      if (resp) {
        navigate("/admin/payslip");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card bordered={false} className=" max-w-[700px] ">
        <Title level={3} className="m-3 text-center">
          Generate Slip
        </Title>
        <Form
          form={form}
          className="m-4"
          name="basic"
          layout="vertical"
          onFinish={OnSubmit}
          autoComplete="off">
          <Form.Item
            label="Salary Month"
            rules={[
              {
                required: true,
                message: "Please input the date!",
              },
            ]}
            name="salaryMonth"
            style={{ marginBottom: "10px" }}>
            {/* <DatePicker popupClassName="z-[9999]" /> */}
            <DatePicker
              format={"M"}
              style={{ maxWidth: "200px" }}
              picker="month"
              onChange={onMonthChange}
            />
          </Form.Item>

          <Form.Item
            label="Salary Year"
            rules={[
              {
                required: true,
                message: "Please input the date!",
              },
            ]}
            name="salaryYear"
            style={{ marginBottom: "10px" }}>
            {/* <DatePicker popupClassName="z-[9999]" /> */}
            <DatePicker
              format={"YYYY"}
              picker="year"
              style={{ maxWidth: "200px" }}
              onChange={onYearChange}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "10px" }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              shape="round"
              loading={addLoading}>
              Generate Now
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

//  AddGenerateSlip;

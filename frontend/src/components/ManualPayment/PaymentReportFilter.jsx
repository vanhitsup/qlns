import Button from "@/UI/Button";
import { loadAllCustomer } from "@/redux/rtk/features/customer/customerSlice";
import { loadPaymentReport } from "@/redux/rtk/features/manualPayment/manualPaymentSlice";
import { loadALLPaymentMethod } from "@/redux/rtk/features/paymentMethod/paymentMethodSlice";
import { DatePicker, Form, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PaymentReportFilter({
  setPageConfig,
  pageConfig,
  setShowTable,
}) {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.customers);
  const { list: paymentMethod, loading: paymentLoading } = useSelector(
    (state) => state.paymentMethod
  );
  const [loader, setLoader] = useState(false);
  const onFinish = async (values) => {
    setLoader(true);
    const resp = await dispatch(
      loadPaymentReport({
        ...values,
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
        query: "report",
      })
    );

    if (resp.payload.message === "success") {
      setShowTable(true);
    }
    setLoader(false);
  };

  useEffect(() => {
    dispatch(loadAllCustomer({ query: "all" }));
    dispatch(loadALLPaymentMethod({ query: "all" }));
  }, [dispatch]);
  return (
    <div className='flex flex-col items-center gap-2 md:p-4 rounded bg-white w-full md:w-1/3'>
      <Form
        layout='vertical'
        className='w-full'
        initialValues={{
          startDate: dayjs(pageConfig.startDate, "YYYY-MM-DD"),
          endDate: dayjs(pageConfig.endDate, "YYYY-MM-DD"),
        }}
        onFinish={onFinish}
      >
        <div className='w-full flex gap-2'>
          <Form.Item
            label='Select Payment Method'
            name='paymentMethodId'
            className='w-1/2'
          >
            <Select
              placeholder='All'
              loading={paymentLoading}
              allowClear
              showSearch={false}
              style={{ width: "100%" }}
              maxTagCount={0}
              onChange={(value) =>
                setPageConfig((prev) => {
                  return {
                    ...prev,
                    method: paymentMethod.find((item) => item.id === value)
                      ?.methodName,
                  };
                })
              }
            >
              {paymentMethod?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.methodName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Select Customer'
            name='customerId'
            className='w-1/2'
          >
            <Select
              placeholder='All'
              loading={loading}
              allowClear
              showSearch={false}
              style={{ width: "100%" }}
              maxTagCount={0}
              onChange={(value) =>
                setPageConfig((prev) => {
                  return {
                    ...prev,
                    customer: list.find((item) => item.id === value)?.username,
                  };
                })
              }
            >
              {list?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item?.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className='flex gap-3'>
          <Form.Item label='From' name='startDate' className='w-1/2'>
            <DatePicker
              onChange={(date) =>
                setPageConfig({
                  ...pageConfig,
                  startDate: date.format("YYYY-MM-DD"),
                })
              }
            />
          </Form.Item>
          <Form.Item label='To' name='endDate' className='w-1/2'>
            <DatePicker
              onChange={(date) =>
                setPageConfig({
                  ...pageConfig,
                  endDate: date.format("YYYY-MM-DD"),
                })
              }
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            loading={loader}
            type='submit'
            className='w-full bg-green-500 text-white rounded p-2'
          >
            Generate Report
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

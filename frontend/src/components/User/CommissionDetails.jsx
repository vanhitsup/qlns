import Card from "@/UI/Card";
import List from "@/UI/List";
import Tabs, { Tab } from "@/UI/Tabs";
import {
  loadSingleSalesCommission,
  paymentSaleCommission,
} from "@/redux/rtk/features/sale/saleSlice";
import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommissionInvoiceList from "./Commission/CommissionInvoiceList";
import CommissionTransactionList from "./Commission/CommissionTransactionList";
import Payments from "./Payments";
export default function CommissionDetails() {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams("id");
  const { singleCommission, loading } = useSelector((state) => state.sales);
  const totalCalculator = () => {};

  const onFormSubmit = async () => {
    setLoader(true);
    const paymentArray = form.getFieldValue("paidAmount");
    const data = {
      userId: id,
      paidAmount: paymentArray,
    };
    try {
      const resp = await dispatch(paymentSaleCommission(data));
      if (resp.payload.message == "success") {
        dispatch(loadSingleSalesCommission(id));
        form.resetFields();
      }
      setLoader(false);
    } catch (err) {}
  };

  useEffect(() => {
    dispatch(loadSingleSalesCommission(id));
  }, [dispatch, id]);
  return (
    <>
      {singleCommission && (
        <div className='flex flex-col sm:flex-row gap-2 md:gap-4'>
          <Card className='w-full sm:w-2/3' bodyClass={"p-0"}>
            <div className='flex justify-between mx-2 py-2 border-b items-center'>
              <div className='flex gap-3'>
                <div className={"text-end "}>
                  <h1 className='font-bold text-lg'>Sale Commission</h1>
                </div>
              </div>
            </div>
            <Tabs className='mt-4'>
              <Tab label='Invoice'>
                {singleCommission?.saleCommission && (
                  <CommissionInvoiceList
                    list={singleCommission?.saleCommission}
                  />
                )}
              </Tab>

              <Tab label='Transactions'>
                {singleCommission?.transaction && (
                  <CommissionTransactionList
                    list={singleCommission?.transaction}
                  />
                )}
              </Tab>
            </Tabs>
          </Card>
          <div className='w-full sm:w-1/3 flex flex-col gap-2 md:gap-4'>
            <Card
              title={
                <div className='flex items-center'>
                  <span className='font-normal'>Details</span>
                </div>
              }
            >
              <>
                <List
                  labelClassName='w-[40%]'
                  list={[
                    {
                      label: "Total Amount:",
                      value: singleCommission.totalPayableCommission.toFixed(2),
                    },

                    {
                      label: "Paid Amount:",
                      value: singleCommission.paidCommission.toFixed(2),
                    },
                    {
                      label: "Remaining Amount:",
                      value: singleCommission.remainingCommission.toFixed(2),
                    },
                  ]}
                />
              </>
            </Card>
            <Card title='Payment'>
              <Form
                form={form}
                name='paymentForm'
                onFinish={onFormSubmit}
                onFinishFailed={() => {}}
                layout='vertical'
                size='large'
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                autoComplete='off'
              >
                <Payments totalCalculator={totalCalculator} />

                <Form.Item className='w-full flex justify-center mt-5'>
                  <Button
                    loading={loader}
                    size={"large"}
                    htmlType='submit'
                    type='primary'
                  >
                    Pay Now
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

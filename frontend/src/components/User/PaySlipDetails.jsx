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
import PaySlipList from "./PaySlip/PaySlipInvoiceList";
import PaySlipTransaction from "./PaySlip/PaySlipTransaction";
import { useGetUserPayrollQuery } from "@/redux/rtk/features/hrm/payroll/payrollApi";
import PaySlipInvoiceList from "./PaySlip/PaySlipInvoiceList";
export default function PaySlipDetails() {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams("id");
  // const { singleCommission, loading } = useSelector((state) => state.sales);
  const { data: singleCommission } = useGetUserPayrollQuery(id);

  // useEffect(() => {
  //   dispatch(loadSingleSalesCommission(id));
  // }, [dispatch, id]);
  return (
    <>
      {singleCommission && (
        <Card className="w-full " bodyClass={"p-0"}>
          <div className=" mx-2 py-2 border-b items-center">
            <div className="flex gap-3">
              <div className={"text-end "}>
                <h1 className="font-bold text-lg">Pay Slip</h1>
              </div>
            </div>
          </div>
          <Tabs className="mt-4">
            <Tab label="Payslip">
              {singleCommission?.payslips && (
                <PaySlipInvoiceList list={singleCommission?.payslips} />
              )}
            </Tab>

            <Tab label="Transactions">
              {singleCommission?.transactions && (
                <PaySlipTransaction list={singleCommission?.transactions} />
              )}
            </Tab>
          </Tabs>
        </Card>
      )}
    </>
  );
}

//  PaySlipDetails;

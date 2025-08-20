import Button from "@/UI/Button";
import CSV from "@/UI/CSV";
import Card from "@/UI/Card";
import ReportTable from "@/components/CommonUi/ReportTable";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PaymentReportPrint from "../Invoice/Report/PaymentReportPrint";
import PaymentReportFilter from "./PaymentReportFilter";

export default function PaymentReport() {
  const [showTable, setShowTable] = useState(false);
  const { list, loading, info } = useSelector((state) => state.manualPayment);

  const [pageConfig, setPageConfig] = useState({
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
    customer: null,
    method: null,
  });

  const columns = [
    {
      id: 1,
      title: "Invoice No",
      dataIndex: "cartOrderId",
      key: "cartOrderId",
      render: (cartOrderId) => (
        <Link to={`/admin/order/${cartOrderId}`}>{cartOrderId}</Link>
      ),
    },
    {
      id: 2,
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (customer) => (
        <Link to={`/admin/staff/${customer.id}`}>{customer.username}</Link>
      ),
    },

    {
      id: 3,
      title: "Account No",
      dataIndex: "customerAccount",
      key: "customerAccount",
      render: (customerAccount) => (customerAccount ? customerAccount : "-"),
    },
    {
      id: 4,
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      id: 5,
      title: "Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod) => paymentMethod.methodName,
    },
    {
      id: 6,
      title: "TRX ID",
      dataIndex: "customerTransactionId",
      key: "customerTransactionId",
      render: (customerTransactionId) =>
        customerTransactionId ? customerTransactionId : "-",
    },
    {
      id: 7,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
  ];

  return (
    <div className="card card-custom mt-3 ">
      <div className="card-body">
        <Card
          className="max-md:border-0 max-md:bg-white"
          bodyClass="max-md:p-0 "
          headClass="border-none"
          title={"Payment Report"}>
          {!showTable ? (
            <PaymentReportFilter
              setPageConfig={setPageConfig}
              pageConfig={pageConfig}
              setShowTable={setShowTable}
            />
          ) : (
            <>
              <div className="flex justify-between p-5 items-start ">
                <div>
                  <Button
                    onClick={() => setShowTable((prev) => !prev)}
                    className="bg-green-500 text-white">
                    Generate Again
                  </Button>
                </div>
                <div className="flex px-5 items-center gap-2 ">
                  <PaymentReportPrint
                    data={list}
                    info={info}
                    payInfo={pageConfig}
                    title={"Payment Report"}
                    pageConfig={pageConfig}
                    type={"print"}
                    btnName="Print"
                  />

                  <PaymentReportPrint
                    data={list}
                    payInfo={pageConfig}
                    title={"Payment Report"}
                    info={info}
                    pageConfig={pageConfig}
                    type={"download"}
                    btnName="Export PDF"
                  />
                  <div>
                    <CSV
                      className="bg-primary text-white "
                      list={list}
                      columns={columns}
                      title={"Payment Report"}
                      btnName={"Export CSV"}>
                      Export CSV
                    </CSV>
                  </div>
                </div>
              </div>
              <ReportTable list={list} columns={columns} loading={loading} />
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

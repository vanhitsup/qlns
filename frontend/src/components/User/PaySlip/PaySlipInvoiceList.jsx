import ViewBtn from "@/components/Buttons/ViewBtn";
import AddPayrollPayment from "@/components/HRM/Payroll/AddPayrollPayment";
import Modal from "@/UI/Modal";
import Table from "@/UI/Table";
import { Tag } from "antd";
import React, { useState } from "react";
import { MdPayments } from "react-icons/md";
import { Link } from "react-router-dom";

export default function PaySlipInvoiceList({ list }) {
  const [edit, setEdit] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Salary Payable",
      dataIndex: "salaryPayable",
      key: "salaryPayable",
    },
    {
      title: "Month ",
      key: "month",
      render: ({ salaryMonth }) => `${salaryMonth}`,
      renderCsv: ({ salaryMonth }) => `${salaryMonth}`,
    },
    {
      title: "Year",
      key: "year",
      render: ({ salaryYear }) => `${salaryYear}`,
      renderCsv: ({ salaryYear }) => `${salaryYear}`,
    },

    {
      title: "bonus",
      dataIndex: "bonus",
      key: "bonus",
    },

    {
      title: "bonusComment",
      dataIndex: "bonusComment",
      key: "bonusComment",
    },

    {
      title: "deduction",
      dataIndex: "deduction",
      key: "deduction",
    },

    {
      title: "deductionComment",
      dataIndex: "deductionComment",
      key: "deductionComment",
    },

    {
      title: "Total",
      dataIndex: "totalPayable",
      key: "totalPayable",
    },
    {
      title: "Total Due Amount",
      dataIndex: "totalDueAmount",
      key: "totalDueAmount",
    },

    {
      title: "W Hours",
      dataIndex: "workingHour",
      key: "workingHour",
      render: (workingHour) => `${workingHour?.toFixed(2)} hours`,
      renderCsv: (workingHour) => `${workingHour?.toFixed(2)} hours`,
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      render: (paymentStatus) => (
        <Tag
          color={
            paymentStatus === "DUE"
              ? "orange"
              : paymentStatus === "PAID"
              ? "green"
              : "red"
          }>
          {paymentStatus}
        </Tag>
      ),
      key: "paymentStatus",
    },

    {
      id: 4,
      title: "",
      key: "action",
      render: (payment) => [
        {
          label: (
            <ViewBtn title={"View"} path={`/admin/payslip/${payment?.id}`} />
          ),
          key: "view",
        },
        {
          label: (
            <>
              <span
                onClick={() => {
                  setEdit(payment);
                }}>
                <button
                  className="flex items-center gap-2 rounded disabled:cursor-not-allowed disabled:opacity-50 px-2 py-1"
                  disabled={payment?.paymentStatus === "PAID"}>
                  <MdPayments className="text-[1rem]" />
                  Make a payment
                </button>
              </span>
            </>
          ),
          key: "view",
        },
      ],
      csvOff: true,
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <>
      <div className="m-1 md:mt-4">
        <Table
          scroll={{ x: true }}
          loading={!list}
          columns={columns}
          data={list ? addKeys(list) : []}
        />
      </div>
      <Modal
        outsideClick={true}
        open={edit}
        title={"Make Payment"}
        onClose={() => setEdit(false)}>
        <AddPayrollPayment data={edit} />
      </Modal>
    </>
  );
}

//  PaySlipList;

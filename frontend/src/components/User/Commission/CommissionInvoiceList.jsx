import Table from "@/UI/Table";
import React from "react";
import { Link } from "react-router-dom";

export default function CommissionInvoiceList({ list }) {
  const columns = [
    {
      id: 1,
      title: "Invoice",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/sale/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Sales Man",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <Link to={`/admin/staff/${user.id}`}>{user.username}</Link>
      ),
      renderCsv: (user) => user.username,
    },
    {
      id: 3,
      title: "Total Commission ",
      dataIndex: "totalPayableCommission",
      key: "totalPayableCommission",
    },
    {
      id: 4,
      title: "Return Commission",
      dataIndex: "commissionReduceForReturn",
      key: "commissionReduceForReturn",
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div className="m-1 md:mt-4">
      <Table
        scroll={{ x: true }}
        loading={!list}
        columns={columns}
        data={list ? addKeys(list) : []}
      />
    </div>
  );
}

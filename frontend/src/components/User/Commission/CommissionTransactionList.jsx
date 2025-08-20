import Table from '@/UI/Table';
import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';

export default function CommissionTransactionList({list}) {
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/transaction/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },

    {
      id: 3,
      title: "Debit Account",
      dataIndex: "debit",
      key: "debit",
      render: (debit) => debit?.name,
      renderCsv: (debit) => debit?.name,
    },

    {
      id: 4,
      title: "Credit Account",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit?.name,
      renderCsv: (credit) => credit?.name,
    },

    {
      id: 5,
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      id: 6,
      title: "Particulars",
      dataIndex: "particulars",
      key: "particulars",
    },
  ];

  const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

  return (
    <div className='m-1 md:mt-4'>
      <Table
        scroll={{ x: true }}
        loading={!list}
        columns={columns}
        data={list ? addKeys(list) : []}
      />
    </div>
  );
}

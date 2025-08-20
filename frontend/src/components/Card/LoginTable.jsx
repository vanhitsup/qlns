import React from "react";
import Table from "@/UI/Table";
import TableForLogin from "./TableForLogin";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Password",
    dataIndex: "password",
    key: "password",
  },
];
const data = [
  {
    key: "1",
    username: "demo",
    password: "5555",
  },
  // {
  //   key: "2",
  //   username: "staff",
  //   password: "staff",
  // },
];

const LoginTable = ({ setDefaultValue }) => {
  return (
    <TableForLogin
      setDefaultValue={setDefaultValue}
      columns={columns}
      data={data}
      pagination={false}
    />
  );
};

export default LoginTable;

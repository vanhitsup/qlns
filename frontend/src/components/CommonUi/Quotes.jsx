import Card from "@/UI/Card";
import Table from "@/UI/Table";
import { Button, Drawer } from "antd";
import moment from "moment";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import AddQuote from "../CRM/Quote/AddQuote";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import { PlusOutlined } from "@ant-design/icons";

export default function Quotes({ data, loading, name, singleLoadThunk }) {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Name",
      key: "quoteName",
      render: ({ quoteName, id }) => (
        <Link to={`/admin/crm/quote/${id}`}>{quoteName}</Link>
      ),
    },
    {
      title: "Owner",
      dataIndex: "quoteOwner",
      render: (quoteOwner, item) => (
        <Link to={`/admin/staff/${item?.quoteOwnerId}`}>
          {quoteOwner?.firstName} {quoteOwner?.lastName}
        </Link>
      ),
    },
    {
      title: "Quotation Date",
      dataIndex: "quoteDate",
      render: (quoteDate) => moment(quoteDate).format("MMMM Do YYYY"),
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
      render: (expirationDate) => moment(expirationDate).format("MMMM Do YYYY"),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },

    {
      title: "Create Date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
    },
  ];

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <span className="font-bold">Quotes</span>
          <UserPrivateComponent permission="create-quote">
            <PlusOutlined
              onClick={() => setOpen(true)}
              className="bg-primary text-white cursor-pointer rounded-sm text-[14px] p-[2px]"
            />
          </UserPrivateComponent>
        </div>
      }
      bodyStyle={{ padding: 0 }}>
      <div>
        <UserPrivateComponent permission="readAll-quote">
          <Table
            bordered
            columns={columns}
            loading={loading}
            data={data ? data.quote : []}
          />
        </UserPrivateComponent>
      </div>

      <UserPrivateComponent permission="create-quote">
        <Drawer
          onClose={onClose}
          open={open}
          title={"Create Quote"}
          width={window.innerWidth <= 768 ? "100%" : "45%"}
          placement="right">
          <div className="mt-4">
            <AddQuote
              onClose={onClose}
              open={open}
              createAs={{ name, value: data?.id, singleLoadThunk }}
            />
          </div>
        </Drawer>
      </UserPrivateComponent>
    </Card>
  );
}

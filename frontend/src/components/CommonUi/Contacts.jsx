import { Drawer } from "antd";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import Table from "@/UI/Table";
import AddContact from "../CRM/Contact/AddContact";
import Card from "@/UI/Card";
import { PlusOutlined } from "@ant-design/icons";

export default function Contacts({ data, loading, name, singleLoadThunk }) {
  // Drawer state
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      render: ({ firstName, lastName, id }) =>
        id ? (
          <Link to={`/admin/crm/contact/${id}`}>
            {firstName} {lastName}
          </Link>
        ) : (
          "-"
        ),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Phone number",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Owner",
      dataIndex: "contactOwner",
      key: "owner",
      render: (contactOwner, item) => (
        <Link to={`/admin/staff/${item?.contactOwnerId}`}>
          {contactOwner?.firstName} {contactOwner?.lastName}
        </Link>
      ),
    },

    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
    },
  ];

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <span className="font-bold">Contacts</span>
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
        <UserPrivateComponent permission="readAll-contact">
          <Table
            bordered
            columns={columns}
            loading={loading}
            data={data ? data.contact : []}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ x: 800, y: 300 }}
          />
        </UserPrivateComponent>
      </div>

      <UserPrivateComponent permission="create-contact">
        <Drawer
          onClose={onClose}
          open={open}
          title={"Create Contact"}
          width={window.innerWidth <= 768 ? "100%" : "45%"}
          placement="right">
          <AddContact
            onClose={onClose}
            open={open}
            createAs={{ name, value: data?.id, singleLoadThunk }}
          />
        </Drawer>
      </UserPrivateComponent>
    </Card>
  );
}

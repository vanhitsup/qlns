import Card from "@/UI/Card";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import { Drawer } from "antd";
import Table from "@/UI/Table";
import { PlusOutlined } from "@ant-design/icons";

export default function Attachments({ data, loading, name, singleLoadThunk }) {
  // Drawer state
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Name",
      key: "attachmentName",
      render: ({ attachmentName, attachmentPath }) => (
        <Link
          target="_blank"
          to={import.meta.env.VITE_APP_API + "media/view/" + attachmentPath}>
          {attachmentName}
        </Link>
      ),
      renderCsv: ({ attachmentName }) => attachmentName,
    },

    {
      title: "Owner",
      dataIndex: "attachmentOwner",
      key: "attachmentOwner",
      render: (attachmentOwner) => (
        <Link to={`/admin/staff/${attachmentOwner?.id}`}>
          {attachmentOwner?.fullName}
        </Link>
      ),
      renderCsv: (attachmentOwner) =>
        `${attachmentOwner?.firstName} ${attachmentOwner?.fullName}`,
    },

    {
      title: "Company",
      key: "company",
      dataIndex: "company",
      render: (company) => (
        <Link to={`/admin/crm/company/${company?.id}`}>
          {company?.companyName}
        </Link>
      ),
      renderCsv: (company) => company.companyName,
    },
    {
      title: "Contact",
      key: "contact",
      dataIndex: "contact",
      render: (contact) => (
        <Link to={`/admin/crm/contact/${contact?.id}`}>
          {contact?.firstName} {contact?.lastName}
        </Link>
      ),
      renderCsv: (contact) => `${contact?.firstName} ${contact?.lastName}`,
    },
    {
      title: "Opportunity",
      key: "opportunity",
      dataIndex: "opportunity",
      render: (opportunity) => (
        <Link to={`/admin/crm/opportunity/${opportunity?.id}`}>
          {opportunity?.opportunityName}
        </Link>
      ),
      renderCsv: (opportunity) => opportunity?.opportunityName,
    },
    {
      title: "Quote",
      key: "quote",
      dataIndex: "quote",
      render: (quote) => (
        <Link to={`/admin/crm/quote/${quote?.id}`}>{quote?.quoteName}</Link>
      ),
      renderCsv: (quote) => quote.quoteName,
    },
    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      renderCsv: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
  ];

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <span className="font-bold">Attachments</span>
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
        <UserPrivateComponent permission="readAll-attachment">
          <Table
            bordered
            columns={columns}
            loading={loading}
            data={data ? data.attachment : []}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ x: 800, y: 300 }}
          />
        </UserPrivateComponent>
      </div>

      <UserPrivateComponent permission="create-attachment">
        <Drawer
          onClose={onClose}
          open={open}
          title={"Create Quote"}
          width={window.innerWidth <= 768 ? "100%" : "45%"}
          placement="right">
          {/* <AddAttachment
            onClose={onClose}
            open={open}
            createAs={{ name, value: data?.id, singleLoadThunk }}
          /> */}
          add attachment
        </Drawer>
      </UserPrivateComponent>
    </Card>
  );
}

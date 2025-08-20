import Card from "@/UI/Card";
import Table from "@/UI/Table";
import { Drawer } from "antd";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddOpportunity from "../CRM/Opportunity/AddOpportunity";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import { PlusOutlined } from "@ant-design/icons";

export default function Opportunities({
  data,
  loading,
  name,
  singleLoadThunk,
}) {
  // Drawer state
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  const onCloseEdit = () => {
    setEdit(false);
  };

  const columns = [
    {
      title: "Name",
      key: "Opportunity Name",
      render: ({ opportunityName, id }) => (
        <Link to={`/admin/crm/opportunity/${id}`}>{opportunityName}</Link>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Stage",
      key: "Stage",
      dataIndex: "opportunityStage",
      render: (field) => field?.opportunityStageName,
    },

    {
      title: "Type",
      dataIndex: "opportunityType",
      key: "opportunityType",
      render: (opportunityType) => opportunityType?.opportunityTypeName,
    },
    {
      title: "Source",
      dataIndex: "opportunitySource",
      key: "opportunitySource",
      render: (opportunitySource) => opportunitySource?.opportunitySourceName,
    },
    {
      title: "Create date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
    },
  ];
  return (
    <Card
      title={<div className="flex items-center gap-2">
				<span className='font-bold'>Opportunities</span>
				<UserPrivateComponent permission='create-quote'>
				  <PlusOutlined  onClick={() => setOpen(true)} className="bg-primary text-white cursor-pointer rounded-sm text-[14px] p-[2px]"/>
		
				</UserPrivateComponent>
			  </div>}
      bodyStyle={{ padding: 0 }}
    >
      <div>
        <UserPrivateComponent permission='readAll-opportunity'>
          <Table
            columns={columns}
            loading={loading}
            data={data ? data.opportunity : []}
          />
        </UserPrivateComponent>
      </div>

      <UserPrivateComponent permission='create-opportunity'>
        <Drawer
          onClose={onClose}
          open={open}
          title={"Create Opportunity"}
          width={window.innerWidth <= 768 ? "100%" : "45%"}
          placement='right'
        >
          <AddOpportunity
            onClose={onClose}
            open={open}
            createAs={{ name, value: data?.id, singleLoadThunk }}
          />
        </Drawer>
      </UserPrivateComponent>
      {/* // edit */}
      <UserPrivateComponent permission='update-opportunity'>
        <Drawer
          onClose={onCloseEdit}
          open={!!edit}
          title={"Update Opportunity"}
          width={window.innerWidth <= 768 ? "100%" : "45%"}
          placement='right'
        >
          <AddOpportunity
            onClose={onCloseEdit}
            open={!!edit}
            edit={edit}
            singleLoad={{ thunk: singleLoadThunk, id: data?.id }}
          />
        </Drawer>
      </UserPrivateComponent>
    </Card>
  );
}

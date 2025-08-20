import { Drawer } from "antd";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import UpdateTask from "../CRM/Task/UpdateTask";
import AddTask from "../CRM/Task/AddTask";
import Card from "@/UI/Card";
import Table from "@/UI/Table";
import { PlusOutlined } from "@ant-design/icons";

export default function Tasks({ data, loading, name, singleLoadThunk }) {
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
      dataIndex: "name",
      key: "TaskName",
      render: (taskName, item) =>
        taskName ? (
          <Link to={`/admin/crm/task/${item.id}`}>{taskName}</Link>
        ) : (
          "-"
        ),
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      render: (assignee) =>
        assignee?.firstName ? (
          <Link to={`/admin/staff/${assignee?.id}`}>
            {assignee?.firstName} {assignee?.lastName}
          </Link>
        ) : (
          "-"
        ),
    },
    {
      title: "Type",
      dataIndex: "taskType",
      key: "taskType",
      render: (type) => (type.taskTypeName ? type.taskTypeName : "-"),
    },
    {
      title: "Status",
      dataIndex: "crmTaskStatus",
      key: "taskType",
      render: (status) => (status.taskStatusName ? status.taskStatusName : "-"),
    },
    {
      title: "priority",
      dataIndex: "priority",
      key: "taskType",
      render: (priority) => (priority.name ? priority.name : "-"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
      render: (notes) => (notes ? notes : "-"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, task) => (
        <span
          onClick={() => setEdit(task)}
          className="bg-teal-500 p-1 cursor-pointer w-8 h-8 flex justify-center items-center rounded">
          <BiEdit className="text-white" />
        </span>
      ),
    },
  ];

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <span className="font-bold">Tasks</span>
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
        <UserPrivateComponent permission="readAll-crmTask">
          <Table
            bordered
            columns={columns}
            loading={loading}
            data={data ? data.tasks : []}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ x: 800, y: 500 }}
          />
        </UserPrivateComponent>
      </div>
      <UserPrivateComponent permission="update-crmTask">
        <UpdateTask
          open={edit}
          task={edit}
          id={edit?.id}
          onClose={onCloseEdit}
        />
      </UserPrivateComponent>
      <UserPrivateComponent permission="create-crmTask">
        <Drawer
          onClose={onClose}
          open={open}
          title={"Create Task"}
          width={window.innerWidth <= 768 ? "100%" : "45%"}
          placement="right">
          <AddTask
            onClose={onClose}
            open={open}
            createAs={{ name, value: data?.id, singleLoadThunk }}
          />
        </Drawer>
      </UserPrivateComponent>
    </Card>
  );
}

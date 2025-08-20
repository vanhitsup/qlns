import Card from "@/UI/Card";
import KanbanBtn from "@/components/Buttons/KanbanBtn";
import MilestoneBtn from "@/components/Buttons/MilestoneBtn";
import TaskBtn from "@/components/Buttons/TaskBtn";
import UpdateStatusBtn from "@/components/Buttons/UpdateStatusBtn";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { useGetProjectsByStatusQuery } from "@/redux/rtk/features/hrm/projectManagement/project/project/projectApi";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddProject from "./AddProject";

export default function GetAllProject() {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetProjectsByStatusQuery(pageConfig);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      key: "name",
      render: ({ name }) => (
        <div className="font-semibold">{name.toUpperCase()}</div>
      ),
      renderCsv: ({ name }) => name,
    },
    {
      id: 3,
      title: "Project Manager",
      key: "projectManager",
      render: ({ projectManager }) =>
        (
          projectManager.firstName +
          " " +
          projectManager.lastName
        ).toUpperCase(),
      renderCsv: ({ projectManager }) =>
        projectManager.firstName + " " + projectManager.lastName,
    },

    {
      id: 5,
      title: "Kanban Board",
      dataIndex: "id",
      key: "board",
      render: (id) => <KanbanBtn path={`/admin/project/kanban/${id}`} />,
      csvOff: true,
    },
    {
      id: 4,
      title: "Milestone",
      dataIndex: "id",
      key: "milestone",
      render: (id) => <MilestoneBtn path={`/admin/project/milestone/${id}`} />,
      csvOff: true,
    },
    {
      id: 4,
      title: "Task Status",
      dataIndex: "",
      key: "taskStatus",
      render: ({ id }) => <TaskBtn path={`/admin/project/task-status/${id}`} />,
      csvOff: true,
    },
    {
      id: 4,
      title: "Project Status",
      dataIndex: "",
      key: "project-status",
      render: ({ id, status }) => (
        <UpdateStatusBtn
          status={status}
          path={`/admin/project/status/update/${id}`}
        />
      ),
      renderCsv: ({ status }) => status,
    },
    {
      id: 3,
      title: "",
      dataIndex: "",
      key: "action",
      render: ({ id, status }) => [
        {
          label: (
            <Link
              to={`/admin/project/update/${id}`}
              className="flex items-center gap-2 cursor-pointer">
              <EditOutlined className=" rounded-md" />
              Edit
            </Link>
          ),
          key: "edit",
        },
      ],
      csvOff: true,
    },
  ];

  const filters = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Pending", value: "PENDING" },
        { label: "Progress", value: "PROGRESS" },
        { label: "Complete", value: "COMPLETE" },
        { label: "On-Hold", value: "ONHOLD" },
        { label: "Deleted", value: "DELETED" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Project"}
      extra={
        <CreateDrawer
          permission={"create-project"}
          title={"Create Project"}
          width={50}>
          <AddProject />
        </CreateDrawer>
      }>
      <UserPrivateComponent permission={"readAll-project"}>
        <TableComponent
          list={data?.getAllProject}
          columns={columns}
          loading={isLoading}
          total={data?.totalProject}
          setPageConfig={setPageConfig}
          title={"Team List"}
          isSearch
          filters={filters}
        />
      </UserPrivateComponent>
    </Card>
  );
}

import Card from "@/UI/Card";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  priorityApi,
  useGetTaskPrioritiesQuery,
} from "@/redux/rtk/features/hrm/projectManagement/project/priority/priorityApi";
import { useState } from "react";
import AddTaskPriority from "./AddTaskPriority";

export default function GetAllProject() {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetTaskPrioritiesQuery(pageConfig);

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
      dataIndex: "name",
      key: "name",
    },
    {
      id: 3,
      title: "",
      key: "action",
      render: ({ id }) => [
        {
          label: (
            <CommonDelete
              className={"bg-white text-black"}
              id={id}
              permission={"delete-priority"}
              deleteThunk={priorityApi.endpoints.deleteTaskPriority.initiate}
              title={"Delete"}
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Task priority"}
      extra={
        <CreateDrawer
          permission={"create-priority"}
          title={"Create Task priority"}
          width={50}>
          <AddTaskPriority />
        </CreateDrawer>
      }>
      <UserPrivateComponent permission={"readAll-priority"}>
        <TableComponent
          list={data}
          columns={columns}
          loading={isLoading}
          setPageConfig={setPageConfig}
          title={"Task priority list"}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
}

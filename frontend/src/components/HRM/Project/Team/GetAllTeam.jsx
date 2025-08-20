import Card from "@/UI/Card";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  projectTeamApi,
  useGetProjectTeamsQuery,
} from "@/redux/rtk/features/hrm/projectManagement/project/projectTeam/projectTeamApi";
import { useState } from "react";
import AddTeam from "./AddTeam";

export default function GetAllProject() {
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });
  const { data, isLoading } = useGetProjectTeamsQuery(pageConfig);

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      id: 3,
      title: "Team Name",
      dataIndex: "projectTeamName",
      key: "projectTeamName",
    },
    {
      id: 2,
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "True" : "False"),
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
              permission={"delete-projectTeam"}
              deleteThunk={projectTeamApi.endpoints.deleteProjectTeam.initiate}
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
      title={"Team"}
      extra={
        <CreateDrawer
          permission={"create-projectTeam"}
          title={"Create Team"}
          width={30}>
          <AddTeam />
        </CreateDrawer>
      }>
      <UserPrivateComponent permission={"readAll-projectTeam"}>
        <TableComponent
          list={data?.getAllProjectTeam}
          columns={columns}
          loading={isLoading}
          total={data?.totalProjectTeam}
          setPageConfig={setPageConfig}
          title={"Team list"}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
}

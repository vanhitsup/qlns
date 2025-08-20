import Card from "@/UI/Card";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  milestoneApi,
  useGetMilestoneByProjectIdQuery,
} from "@/redux/rtk/features/hrm/projectManagement/project/milestone/milestoneApi";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import AddMilestone from "./AddMilestone";
import { EditOutlined } from "@ant-design/icons";

export default function GetAllMilestone() {
  const { id } = useParams("id");
  const { isLoading: loading, data: list } =
    useGetMilestoneByProjectIdQuery(id);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
      render: (startDate) => moment(startDate).format("ll"),
      renderCsv: (startDate) => moment(startDate).format("ll"),
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
      render: (endDate) => moment(endDate).format("ll"),
      renderCsv: (endDate) => moment(endDate).format("ll"),
    },
    // {
    //   id: 12,
    //   title: "",
    //   key: "action",
    //   render: ({ id }) => [
    //     {
    //       label: (
    //         <UserPrivateComponent permission={"update-product"}>
    //           <Link
    //             to={`/admin/project/milestone/update/${id}`}
    //             className="flex items-center gap-2 cursor-pointer">
    //             <EditOutlined className=" rounded-md" />
    //             Edit
    //           </Link>
    //         </UserPrivateComponent>
    //       ),
    //       key: "Update",
    //     },
    //     {
    //       label: (
    //         <CommonDelete
    //           className={"bg-white text-black"}
    //           id={id}
    //           permission={"delete-milestone"}
    //           deleteThunk={milestoneApi.endpoints.deleteMilestone.initiate}
    //           title={"Delete"}
    //         />
    //       ),
    //       key: "delete",
    //     },
    //   ],
    // },
    {
      id: 12,
      title: "",
      key: "action",
      render: ({ id, status }) => [
        {
          label: (
            <Link
              to={`/admin/project/milestone/update/${id}`}
              className="flex items-center gap-2 cursor-pointer">
              <EditOutlined className=" rounded-md" />
              Edit
            </Link>
          ),
          key: "Update",
        },
        {
          label: (
            <CommonDelete
              className={"bg-white text-black"}
              id={id}
              permission={"delete-milestone"}
              deleteThunk={milestoneApi.endpoints.deleteMilestone.initiate}
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
      title={"Milestone in Project"}
      extra={
        <CreateDrawer
          permission={"create-milestone"}
          title={"Create Milestone"}
          width={50}>
          <AddMilestone projectId={id} isFixed={true} />
        </CreateDrawer>
      }>
      <UserPrivateComponent permission={"readAll-milestone"}>
        <TableComponent
          list={list}
          columns={columns}
          loading={loading}
          title={"Task Status list"}
          isSearch={false}
        />
      </UserPrivateComponent>
    </Card>
  );
}

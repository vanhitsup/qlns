import Card from "@/UI/Card";
import ViewBtn from "@/components/Buttons/ViewBtn";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  deleteLeavePolicy,
  loadAllLeavePolicyPaginated,
} from "@/redux/rtk/features/hrm/leavePolicy/leavePolicySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddLeavePolicy from "./AddLeavePolicy";
import CommonDelete from "@/components/CommonUi/CommonDelete";

export default function GetAllLeave() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.leavePolicy);

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

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
      title: "Total Paid Leave",
      dataIndex: "paidLeaveCount",
      key: "paidLeaveCount",
    },

    {
      id: 3,
      title: "Total Unpaid Leave",
      dataIndex: "unpaidLeaveCount",
      key: "unpaidLeaveCount",
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: ({ id, status }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/leave-policy/${id}`} />,
          key: "view",
        },
        {
          label: (
            <CommonDelete
              values={{
                id,
                status,
              }}
              title={status === "true" ? "Hide" : "Show"}
              permission={"delete-leavePolicy"}
              deleteThunk={deleteLeavePolicy}
              loadThunk={loadAllLeavePolicyPaginated}
              query={pageConfig}
              className="bg-white text-black"
            />
          ),
          key: "delete",
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
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllLeavePolicyPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Leave Policy"}
      extra={
        <CreateDrawer
          permission={"create-leavePolicy"}
          title={"Create Leave Policy"}
          width={35}>
          <AddLeavePolicy />
        </CreateDrawer>
      }>
      <UserPrivateComponent permission={"readAll-leavePolicy"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          filters={filters}
          setPageConfig={setPageConfig}
          title={"Leave Policy List"}
        />
      </UserPrivateComponent>
    </Card>
  );
}

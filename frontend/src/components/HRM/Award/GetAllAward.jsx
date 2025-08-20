import Card from "@/UI/Card";
import ViewBtn from "@/components/Buttons/ViewBtn";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  deleteAward,
  loadAllAwardPaginated,
} from "@/redux/rtk/features/hrm/award/awardSlice";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAward from "./AddAward";
import { Link } from "react-router-dom";
import CommonDelete from "@/components/CommonUi/CommonDelete";

export default function GetAllAward() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.award);
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
      dataIndex: "",
      key: "name",
      render: ({ name, id }) => (
        <Link
          className="hover:text-primary duration-200"
          to={`/admin/award/${id}`}>
          {name}
        </Link>
      ),
      renderCsv: ({ name }) => name,
    },

    {
      id: 3,
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      id: 3,
      title: "Created at",
      dataIndex: "createdAt",
      key: "addrcreatedAtess",
      render: (createdAt) => dayjs(createdAt).format("YYYY-MM-DD"),
      renderCsv: (createdAt) => dayjs(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: ({ id, status }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/award/${id}`} />,
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
              permission={"delete-award"}
              deleteThunk={deleteAward}
              loadThunk={loadAllAwardPaginated}
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
    dispatch(loadAllAwardPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Award"}
      extra={
        <CreateDrawer
          permission={"create-award"}
          title={"Create Award"}
          width={35}>
          <AddAward />
        </CreateDrawer>
      }>
      <UserPrivateComponent permission={"readAll-award"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          filters={filters}
          setPageConfig={setPageConfig}
          title={"Award List"}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
}

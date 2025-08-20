import Card from "@/UI/Card";
import ViewBtn from "@/components/Buttons/ViewBtn";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  clearDesignationList,
  deleteDesignation,
  loadAllDesignation,
} from "@/redux/rtk/features/hrm/designation/designationSlice";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddDesignation from "./AddDesignation";
import TableComponent from "@/components/CommonUi/TableComponent";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";

const GetAllDesignation = () => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.designations);
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
      render: (id) => <Link to={`/admin/designation/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/designation/${id}`}>{name}</Link>
      ),
      renderCsv: (name) => name || "N/A",
    },
    {
      id: 3,
      title: "",
      key: "action",
      render: ({ id, status, name }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/designation/${id}`} />,
          key: "view",
        },
        {
          label: (
            <UserPrivateComponent permission={"update-designation"}>
              <Link
                to={`/admin/designation/${id}/update`}
                state={{ data: { name: name } }}
                className="flex items-center gap-2 cursor-pointer">
                <EditOutlined className=" rounded-md" />
                Edit
              </Link>
            </UserPrivateComponent>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              values={{
                id,
                status,
              }}
              title={status === "true" ? "Hide" : "Show"}
              permission={"delete-designation"}
              deleteThunk={deleteDesignation}
              loadThunk={loadAllDesignation}
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
    dispatch(loadAllDesignation(pageConfig));
    return () => {
      dispatch(clearDesignationList());
    };
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Designations"}
      extra={
        <CreateDrawer
          permission={"create-designation"}
          title={"Create Designation"}
          width={35}>
          <AddDesignation />
        </CreateDrawer>
      }>
      <UserPrivateComponent permission={"readAll-designation"}>
        <TableComponent
          list={list}
          total={total}
          loading={loading}
          columns={columns}
          setPageConfig={setPageConfig}
          paginatedThunk={loadAllDesignation}
          title={"Designation List"}
          filters={filters}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllDesignation;

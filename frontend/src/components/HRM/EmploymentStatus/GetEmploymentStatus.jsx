import ViewBtn from "@/components/Buttons/ViewBtn";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import {
  clearEmployeeStatusList,
  deleteEmployeeStatus,
  loadAllEmployeeStatusPaginated,
} from "@/redux/rtk/features/hrm/employeeStatus/employeeStatusSlice";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddEmploymentStatus from "./AddEmploymentStatus";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import TableComponent from "@/components/CommonUi/TableComponent";

export default function GetEmploymentStatus() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector(
    (state) => state.employmentStatus
  );
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
      render: (id) => <Link to={`/admin/employment-status/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/employment-status/${id}`}>{name}</Link>
      ),
      renderCsv: (name) => name,
    },
    {
      id: 3,
      title: "Color Code",
      dataIndex: "colourValue",
      key: "colourValue",
      render: (colourValue) => (
        <div className="flex">
          <div
            className="rounded border border-gray-200"
            style={{
              marginRight: "10px",
              width: "20px",
              height: "20px",
              backgroundColor: colourValue,
            }}></div>
          {colourValue}
        </div>
      ),
      renderCsv: (colourValue) => colourValue,
    },
    {
      id: 4,
      title: "Weekend Salary",
      dataIndex: "isWeekendPaid",
      render: (isWeekendPaid) => (isWeekendPaid === "true" ? "Yes" : "No"),
      renderCsv: (isWeekendPaid) =>
        isWeekendPaid === "true" ? "Paid" : "Unpaid",
      key: "isHolidayPaid",
    },
    {
      id: 4,
      title: "Holiday Salary",
      dataIndex: "isHolidayPaid",
      render: (isHolidayPaid) => (isHolidayPaid === "true" ? "Yes" : "No"),
      renderCsv: (isHolidayPaid) =>
        isHolidayPaid === "true" ? "Paid" : "Unpaid",
      key: "isHolidayPaid",
    },
    {
      id: 4,
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      id: 5,
      title: "",
      key: "action",
      render: ({ id, status }) => [
        {
          label: (
            <ViewBtn title={"View"} path={`/admin/employment-status/${id}`} />
          ),
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
              permission={"delete-employmentStatus"}
              deleteThunk={deleteEmployeeStatus}
              loadThunk={loadAllEmployeeStatusPaginated}
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
    dispatch(loadAllEmployeeStatusPaginated(pageConfig));
    return () => {
      dispatch(clearEmployeeStatusList());
    };
  }, [dispatch, pageConfig]);

  return (
    <>
      <Card
        className="border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]"
        bodyStyle={{ padding: 0 }}>
        <div className="flex flex-col sm:flex-row items-center justify-between pb-3">
          <h1 className="text-lg font-bold mb-3 ms:mb-0">
            Employment Status List
          </h1>
          <div className="flex justify-between md:justify-start gap-3 items-center">
            <CreateDrawer
              permission={"create-employmentStatus"}
              title={"Create Employment Status"}
              width={35}>
              <AddEmploymentStatus />
            </CreateDrawer>
          </div>
        </div>
        <UserPrivateComponent permission={"readAll-employmentStatus"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            filters={filters}
            setPageConfig={setPageConfig}
            title={"Employment Status List"}
          />
        </UserPrivateComponent>
      </Card>
    </>
  );
}

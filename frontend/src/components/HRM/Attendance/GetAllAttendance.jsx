import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadAllAttendancePaginated } from "@/redux/rtk/features/hrm/attendance/attendanceSlice";
import { Tag } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAttendance from "./AddAttendance";

export default function GetAllAttendance() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.attendance);

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
      id: 10,
      title: "Name",
      dataIndex: "user",
      key: "user",
      render: (user) => `${user?.firstName} ${user?.lastName}`,
      renderCsv: (user) => `${user?.firstName} ${user?.lastName}`,
    },
    {
      id: 2,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (inTime) => dayjs(inTime).format("DD-MM-YYYY") || "NONE",
      renderCsv: (inTime) =>
        dayjs(inTime).format("DD-MM-YYYY") || "NONE",
    },
    {
      id: 3,
      title: "In Time",
      dataIndex: "inTime",
      key: "inTime",
      render: (inTime) => dayjs(inTime).format("h:mm A") || "NONE",
      renderCsv: (inTime) =>
        dayjs(inTime).format("h:mm A") || "NONE",
    },
    {
      id: 4,
      title: "Out Time ",
      dataIndex: `outTime`,
      key: "outTime",
      render: (outTime) =>
        dayjs(outTime).format("h:mm A") || "NONE",
      renderCsv: (outTime) =>
        dayjs(outTime).format("DD-MM-YYYY, h:mm A") || "NONE",
    },
    {
      id: 5,
      title: "In Status",
      dataIndex: "inTimeStatus",
      key: "inTimeStatus",
      render: (inTimeStatus) => {
        // use Tag component from antd to show status in different colors like green, red, yellow etc based on the status value
        if (inTimeStatus === "Late") {
          return <Tag color="red">{inTimeStatus.toUpperCase()}</Tag>;
        } else if (inTimeStatus === "Early") {
          return <Tag color="blue">{inTimeStatus.toUpperCase()}</Tag>;
        } else if (inTimeStatus === "On Time") {
          return <Tag color="green">{inTimeStatus.toUpperCase()}</Tag>;
        } else {
          return <Tag style={{ color: "orange" }}>NONE</Tag>;
        }
      },
      renderCsv: (inTimeStatus) => inTimeStatus,
    },
    {
      id: 6,
      title: "Out Status",
      dataIndex: "outTimeStatus",
      key: "outTimeStatus",
      render: (outTimeStatus) => {
        if (outTimeStatus === "Late") {
          return <Tag color="red">{outTimeStatus.toUpperCase()}</Tag>;
        } else if (outTimeStatus === "Early") {
          return <Tag color="blue">{outTimeStatus.toUpperCase()}</Tag>;
        } else if (outTimeStatus === "On Time") {
          return <Tag color="green">{outTimeStatus.toUpperCase()}</Tag>;
        } else {
          return <Tag style={{ color: "orange" }}>NONE</Tag>;
        }
      },
      renderCsv: (outTimeStatus) => outTimeStatus,
    },
    {
      id: 7,
      title: "Total Hour",
      dataIndex: "totalHour",
      key: "totalHour",
      render: (totalHour) => totalHour || "Not Checked",
      renderCsv: (totalHour) => totalHour || "Not Checked",
    },

    {
      id: 8,
      title: "Punch By",
      dataIndex: "punchBy",
      key: "punchBy",
      render: (punchBy) => (
        <span>
          {punchBy[0]?.firstName + " " + punchBy[0]?.lastName || "Not Checked"}
        </span>
      ),
      renderCsv: (punchBy) =>
        punchBy[0]?.firstName + " " + punchBy[0]?.lastName,
    },
  ];

  useEffect(() => {
    dispatch(loadAllAttendancePaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Attendance List"}
      extra={
        <CreateDrawer
          permission={"create-attendance"}
          title={"Create Attendance"}
          width={40}>
          <AddAttendance />
        </CreateDrawer>
      }>
      <UserPrivateComponent permission={"readAll-attendance"}>
        <TableComponent
          columns={columns}
          list={list}
          total={total}
          loading={loading}
          setPageConfig={setPageConfig}
          title={"Staff List"}
          // filters={filters}
        />
      </UserPrivateComponent>
    </Card>
  );
}

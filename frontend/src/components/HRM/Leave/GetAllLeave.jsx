import React from "react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import TableComponent from "@/components/CommonUi/TableComponent";
import { loadAllLeavePaginated } from "@/redux/rtk/features/hrm/leave/leaveSlice";
import dayjs from "dayjs";
import { Tag } from "antd";
import ViewBtn from "@/components/Buttons/ViewBtn";
import BtnViewSvg from "@/components/UI/Button/btnViewSvg";
import AddLeave from "./AddLeave";
import { EditOutlined } from "@ant-design/icons";

export default function GetAllLeave() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.leave);

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/leave/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },

    {
      id: 2,
      title: " Name",
      key: "name",
      dataIndex: "user",
      render: ({ firstName, lastName, id }) => (
        <Link to={`/admin/staff/${id}`}>{firstName + " " + lastName}</Link>
      ),
      renderCsv: ({ firstName, lastName }) => firstName + " " + lastName,
    },
    {
      id: 3,
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      id: 4,
      title: "Leave From",
      key: "leaveFrom",
      render: ({ leaveFrom, status, acceptLeaveFrom }) => {
        return status === "ACCEPTED"
          ? dayjs(acceptLeaveFrom).format("DD-MM-YYYY")
          : dayjs(leaveFrom).format("DD-MM-YYYY");
      },
      renderCsv: ({ leaveFrom, status, acceptLeaveFrom }) => {
        return status === "ACCEPTED"
          ? dayjs(acceptLeaveFrom).format("DD-MM-YYYY")
          : dayjs(leaveFrom).format("DD-MM-YYYY");
      },
    },
    {
      id: 5,
      title: "Leave To",
      key: "leaveTo",
      render: ({ leaveTo, status, acceptLeaveTo }) => {
        return status === "ACCEPTED"
          ? dayjs(acceptLeaveTo).format("DD-MM-YYYY")
          : dayjs(leaveTo).format("DD-MM-YYYY");
      },
      renderCsv: ({ leaveTo, status, acceptLeaveTo }) => {
        return status === "ACCEPTED"
          ? dayjs(acceptLeaveTo).format("DD-MM-YYYY")
          : dayjs(leaveTo).format("DD-MM-YYYY");
      },
    },
    {
      id: 6,
      title: "Leave Duration",
      dataIndex: "leaveDuration",
      key: "leaveDuration",
      render: (leaveDuration) => {
        if (leaveDuration > 1) {
          return <span>{leaveDuration} days</span>;
        } else {
          return <span>{leaveDuration} day</span>;
        }
      },
      renderCsv: (leaveDuration) => {
        if (leaveDuration > 1) {
          return leaveDuration + "days";
        } else {
          return leaveDuration + "day";
        }
      },
    },
    {
      id: 7,
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "ACCEPTED") {
          return <Tag color="green">{status.toUpperCase()}</Tag>;
        } else if (status === "REJECTED") {
          return <Tag color="red">{status.toUpperCase()}</Tag>;
        } else {
          return <Tag color="orange">{status.toUpperCase()}</Tag>;
        }
      },
      renderCsv: (status) => status,
    },

    {
      id: 7,
      title: "",
      key: "action",
      render: ({ id }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/leave/${id}`} />,
          key: "view",
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
        { label: "All" },
        { label: "ACCEPTED", value: "ACCEPTED" },
        { label: "PENDING", value: "PENDING" },
        { label: "REJECTED", value: "REJECTED" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllLeavePaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Leave Application"}
      extra={
        <CreateDrawer
          permission={"create-leaveApplication"}
          title={"Create Leave"}
          width={35}>
          <AddLeave />
        </CreateDrawer>
      }>
      <UserPrivateComponent permission={"readAll-leaveApplication"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          filters={filters}
          setPageConfig={setPageConfig}
          title={"Leave List"}
        />
      </UserPrivateComponent>
    </Card>
  );
}

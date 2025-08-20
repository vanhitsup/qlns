import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import {
  deleteJob,
  editJob,
  loadAllJobPaginated,
} from "@/redux/rtk/features/hrm/job/jobSlice";
import AddJob from "./AddJob";
import { loadAllJobCategory } from "@/redux/rtk/features/hrm/jobCategory/jobCategorySlice";
import { loadAllJobLocation } from "@/redux/rtk/features/hrm/jobLocation/jobLocationSlice";
import ViewBtn from "@/components/Buttons/ViewBtn";
import { Link } from "react-router-dom";

export default function GetAllJob() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.job);
  const { list: jobCategory, loading: jobCategoryLoading } = useSelector(
    (state) => state.jobCategory
  );
  const { list: jobLocation, loading: jobLocationLoading } = useSelector(
    (state) => state.jobLocation
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
    },
    {
      id: 2,
      title: "Title",
      dataIndex: "",
      key: "jobTitle",
      render: ({ id, jobTitle }) => (
        <Link className="hover:text-primary" to={`/admin/job/${id}`}>
          {jobTitle}
        </Link>
      ),
      renderCsv: ({ jobTitle }) => jobTitle,
    },
    {
      id: 2,
      title: "Job Category",
      dataIndex: "jobCategory",
      key: "jobCategory",
      render: (jobCategory) => jobCategory.jobCategoryName,
      renderCsv: (jobCategory) => jobCategory.jobCategoryName,
    },

    {
      id: 2,
      title: "Total vacancy",
      dataIndex: "totalPosition",
      key: "totalPosition",
    },

    {
      id: 2,
      title: "Job Type",
      dataIndex: "jobType",
      key: "jobType",
      render: (jobCategory) => jobCategory.jobTypeName,
      renderCsv: (jobCategory) => jobCategory.jobTypeName,
    },
    {
      id: 2,
      title: "Job Location",
      dataIndex: "jobLocation",
      key: "jobLocation",
      render: (jobLocation) => jobLocation.jobLocation,
      renderCsv: (jobLocation) => jobLocation.jobLocation,
    },

    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/job/${item.id}`} />,
          key: "view",
        },
        {
          label: (
            <UserPrivateComponent permission={"update-job"}>
              <Link
                to={`${item.id}/update`}
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
                id: item.id,
                status: item.status,
              }}
              title={item.status === "true" ? "Hide" : "Show"}
              permission={"delete-jobCategory"}
              deleteThunk={deleteJob}
              loadThunk={loadAllJobPaginated}
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
    {
      key: "jobCategoryId",
      label: "Job Category",
      type: "select",
      options: jobCategory?.map((item) => ({
        label: item?.jobCategoryName,
        value: item?.id,
      })),
      className: "min-w-[123px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "jobLocationId",
      label: "Job Location",
      type: "select",
      options: jobLocation?.map((item) => ({
        label: item?.jobLocation,
        value: item?.id,
      })),
      className: "min-w-[123px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllJobPaginated(pageConfig));
  }, [dispatch, pageConfig]);
  useEffect(() => {
    dispatch(loadAllJobCategory());
    dispatch(loadAllJobLocation());
  }, [dispatch]);

  return (
    <>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"Job"}
        extra={
          <CreateDrawer
            permission={"create-job"}
            title={"Create Job"}
            width={60}>
            <AddJob />
          </CreateDrawer>
        }>
        <UserPrivateComponent permission={"readAll-job"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            filters={filters}
            setPageConfig={setPageConfig}
            title={"Job List"}
            isSearch
          />
        </UserPrivateComponent>
      </Card>
    </>
  );
}

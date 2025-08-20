import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import { EditOutlined } from "@ant-design/icons";
import { Modal, Tag } from "antd";
import dayjs from "dayjs";
import { loadAllJob } from "@/redux/rtk/features/hrm/job/jobSlice";
import ViewBtn from "@/components/Buttons/ViewBtn";
import {
  deleteJobInterview,
  editJobInterview,
  loadAllJobInterviewPaginated,
} from "@/redux/rtk/features/hrm/jobInterview/jobInterviewSlice";
import AddJobInterview from "./AddJobInterview";
import UpdateJobInterview from "./UpdateJobInterview";
import ScheduleDateSelection from "./ScheduleDateSelection";

export default function GetAllJobInterview() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.jobInterview);
  const { list: jobList, loading: jobLoading } = useSelector(
    (state) => state.job
  );

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "jobApplication",
      title: "Candidate Name",
      dataIndex: "jobApplication",
      render: (jobApplication) => jobApplication?.name,
      renderCsv: (jobApplication) => jobApplication?.name,
    },
    {
      key: "jobApplication",
      title: "Applied For",
      dataIndex: "jobApplication",
      render: (jobApplication) => jobApplication?.job?.jobTitle,
      renderCsv: (jobApplication) => jobApplication?.job?.jobTitle,
    },
    {
      key: "scheduleDate",
      title: "Schedule Date",
      dataIndex: "scheduleDate",
    },
    {
      key: "scheduleTime",
      title: "Schedule Time",
      dataIndex: "scheduleTime",
      render: (scheduleTime) =>
        dayjs(`1970-01-01 ${scheduleTime}`, {
          customParseFormat: "HH:mm:ss",
        }).format("h:mm A"),
    },
    {
      key: "interviewStatus",
      title: "Interview Status",
      dataIndex: "interviewStatus",
      render: (interviewStatus) => (
        <Tag color={interviewStatus === "PENDING" ? "orange" : "green"}>
          {interviewStatus}
        </Tag>
      ),
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <ViewBtn title={"View"} path={`/admin/job-interview/${item.id}`} />
          ),
          key: "view",
        },
        {
          label: (
            <UserPrivateComponent permission={"update-jobApplication"}>
              <div
                onClick={() => {
                  dispatch(editJobInterview(item));
                  showModal();
                }}
                className="flex items-center gap-2 cursor-pointer">
                <EditOutlined className="gray-600 rounded-md" />
                Edit
              </div>
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
              permission={"delete-jobApplication"}
              deleteThunk={deleteJobInterview}
              loadThunk={loadAllJobInterviewPaginated}
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
      key: "interviewStatus",
      label: "Interview Status",
      type: "select",
      options: [
        { label: "PENDING", value: "PENDING" },
        { label: "INTERVIEWED", value: "INTERVIEWED" },
      ],
      className: "min-w-[140px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "jobId",
      label: "Jobs",
      type: "select",
      options: jobList?.map((job) => ({
        label: job?.jobTitle,
        value: job?.id,
      })),
      className: "min-w-[140px] max-w-[150px]",
      popupClassName: "w-[100px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllJobInterviewPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  useEffect(() => {
    dispatch(loadAllJob());
  }, [dispatch]);

  return (
    <>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"Job Interview"}
        extra={
          <>
            <ScheduleDateSelection setPageConfig={setPageConfig} />
            <CreateDrawer
              permission={"create-jobInterview"}
              title={"Create Job Interview"}
              width={45}>
              <AddJobInterview />
            </CreateDrawer>
          </>
        }>
        <UserPrivateComponent permission={"readAll-jobInterview"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            filters={filters}
            setPageConfig={setPageConfig}
            title={"Job Interview List"}
            isSearch
          />
        </UserPrivateComponent>
      </Card>

      <Modal
        title="Update Job Interview"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}>
        <UpdateJobInterview handleCancel={handleCancel} />
      </Modal>
    </>
  );
}

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
  deleteJobApplication,
  editJobApplication,
  loadAllJobApplicationPaginated,
} from "@/redux/rtk/features/hrm/jobApplication/jobApplicationSlice";
import AddJobApplication from "./AddJobApplication";
import dayjs from "dayjs";
import { loadAllJob } from "@/redux/rtk/features/hrm/job/jobSlice";
import ViewBtn from "@/components/Buttons/ViewBtn";
import UpdateJobApplication from "./UpdateJobApplication";
import { loadAllJobApplicationStatus } from "@/redux/rtk/features/hrm/jobApplicationStatus/jobApplicationStatusSlice";

export default function GetAllJobApplication() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.jobApplication);
  const { jobApplicationStatus } = useSelector(
    (state) => state.jobApplicationStatus
  );

  const { list: job } = useSelector((state) => state.job);
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
      key: "job",
      title: "Job Title",
      dataIndex: "job",
      render: (job) => job?.jobTitle,
      renderCsv: (job) => job?.jobTitle,
    },
    {
      key: "name",
      title: "Candidate",
      dataIndex: "name",
    },
    {
      key: "createdAt",
      title: "Application Date",
      dataIndex: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY"),
      renderCsv: (createdAt) => dayjs(createdAt).format("DD/MM/YYYY"),
    },
    {
      key: "applicationStatus",
      title: "Status",
      dataIndex: "jobApplicationStatus",
      render: (jobApplicationStatus) => (
        <span
          className={`${
            jobApplicationStatus.applicationStatus === "APPLIED"
              ? `text-gray-700 bg-gray-100`
              : jobApplicationStatus.applicationStatus === "REVIEWING"
              ? `text-yellow-600 bg-yellow-100`
              : jobApplicationStatus.applicationStatus ===
                "SELECTED FOR INTERVIEW"
              ? `text-green-600 bg-green-100`
              : jobApplicationStatus.applicationStatus === "INTERVIEWING"
              ? `text-yellow-600 bg-yellow-100`
              : jobApplicationStatus.applicationStatus === "INTERVIEWED"
              ? `text-orange-700 bg-orange-100`
              : jobApplicationStatus.applicationStatus === "HIRED"
              ? `text-green-700 bg-green-100`
              : `text-red-600 bg-red-100`
          } font-bold`}>
          {jobApplicationStatus.applicationStatus}
        </span>
      ),
      renderCsv: (jobApplicationStatus) =>
        jobApplicationStatus.applicationStatus,
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <ViewBtn
              title={"View"}
              path={`/admin/job-application/${item.id}`}
            />
          ),
          key: "view",
        },
        {
          label: (
            <UserPrivateComponent permission={"update-jobApplication"}>
              <div
                onClick={() => {
                  dispatch(editJobApplication(item));
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
              deleteThunk={deleteJobApplication}
              loadThunk={loadAllJobApplicationPaginated}
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
      key: "applicationStatusId",
      label: "Application Status",
      type: "select",
      options: jobApplicationStatus?.map((item) => ({
        label: item?.applicationStatus,
        value: item?.id,
      })),
      className: "min-w-[160px] max-w-[200px]",
      popupClassName: "w-[100px]",
    },
    {
      key: "jobId",
      label: "Jobs",
      type: "select",
      options: job?.map((item) => ({
        label: item?.jobTitle,
        value: item?.id,
      })),
      className: "min-w-[120px] max-w-[200px]",
      popupClassName: "w-[100px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllJobApplicationPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  useEffect(() => {
    dispatch(loadAllJobApplicationStatus());
    dispatch(loadAllJob());
  }, [dispatch]);

  return (
    <>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"Job Application"}
        extra={
          <CreateDrawer
            permission={"create-jobApplication"}
            title={"Create Job Application"}
            width={45}>
            <AddJobApplication />
          </CreateDrawer>
        }>
        <UserPrivateComponent permission={"readAll-jobApplication"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            filters={filters}
            setPageConfig={setPageConfig}
            title={"Job Application List"}
            isSearch
          />
        </UserPrivateComponent>
      </Card>

      <Modal
        title="Update Job Application"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}>
        <UpdateJobApplication handleCancel={handleCancel} />
      </Modal>
    </>
  );
}

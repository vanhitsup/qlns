import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAnnouncement from "./AddAnnouncement";
import {
  deleteAnnouncement,
  loadAllAnnouncementPaginated,
  updateAnnouncement,
} from "@/redux/rtk/features/hrm/announcement/announcementSlice";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import Modal from "@/UI/Modal";
import UpdateAnnouncement from "./UpdateAnnouncement";

export default function GetAllAnnouncement() {
  const dispatch = useDispatch();
  const { list, loading, total } = useSelector((state) => state.announcement);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = (item) => {
  //   setIsModalOpen(true);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      dataIndex: "title",
      key: "title",
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
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-announcement"}>
              <div
                onClick={() => {
                  setIsModalOpen(item);
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
                id: item?.id,
                status: item?.status,
              }}
              title={item?.status === "true" ? "Hide" : "Show"}
              permission={"delete-award"}
              deleteThunk={deleteAnnouncement}
              loadThunk={loadAllAnnouncementPaginated}
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
    dispatch(loadAllAnnouncementPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"Announcement"}
        extra={
          <CreateDrawer
            permission={"create-announcement"}
            title={"Create Announcement"}
            width={35}>
            <AddAnnouncement />
          </CreateDrawer>
        }>
        <UserPrivateComponent permission={"readAll-announcement"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            setPageConfig={setPageConfig}
            title={"Announcement List"}
            filters={filters}
          />
        </UserPrivateComponent>
      </Card>
      <Modal
        title="Update Attendance"
        open={isModalOpen}
        onClose={handleCancel}
        closeIcon={true}
        footer={false}>
        <UpdateAnnouncement data={isModalOpen} handleCancel={handleCancel} />
      </Modal>
    </>
  );
}

import Card from "@/UI/Card";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import {
  deletePublicHoliday,
  editPublicHoliday,
  loadAllPublicHolidayPaginated,
} from "@/redux/rtk/features/hrm/holiday/publicHolidaySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPublicHoliday from "./AddPublicHoliday";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import UpdatePublicHoliday from "./UpdatePublicHoliday";
import moment from "moment";

export default function GetAllPublicHoliday() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.publicHoliday);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      title: "Start Date",
      dataIndex: "startDate",
      key: "date",
      render: (data) => moment(data).format("ll"),
      renderCsv: (data) => moment(data).format("ll"),
    },
    {
      id: 4,
      title: "End Date",
      dataIndex: "endDate",
      key: "date",
      render: (data) => moment(data).format("ll"),
      renderCsv: (data) => moment(data).format("ll"),
    },
    {
      id: 3,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("ll"),
      renderCsv: (createdAt) => moment(createdAt).format("ll"),
    },

    {
      id: 4,
      title: "",
      dataIndex: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-publicHoliday"}>
              <div
                onClick={() => {
                  dispatch(editPublicHoliday(item));
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
              title={item.status === "true" ? "Delete" : "Show"}
              permission={"delete-publicHoliday"}
              deleteThunk={deletePublicHoliday}
              loadThunk={loadAllPublicHolidayPaginated}
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

  useEffect(() => {
    dispatch(loadAllPublicHolidayPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"Public Holiday"}
        extra={
          <CreateDrawer
            permission={"create-publicHoliday"}
            title={"Create Public Holiday"}
            width={35}>
            <AddPublicHoliday />
          </CreateDrawer>
        }>
        <UserPrivateComponent permission={"readAll-publicHoliday"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            setPageConfig={setPageConfig}
            title={"Public Holiday List"}
          />
        </UserPrivateComponent>
      </Card>

      <Modal
        title="Update Public Holiday"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}>
        <UpdatePublicHoliday handleCancel={handleCancel} />
      </Modal>
    </>
  );
}

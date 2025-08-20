import Card from "@/UI/Card";
import {
  clearWeightList,
  deleteWeightUnit,
  editWeightUnit,
  loadALLWeightUnit,
} from "@/redux/rtk/features/weightUnit/weightUnitSlice";
import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddWeightUnit from "./AddWeightUnit";
import UpdateWeightUnit from "./UpdateWeightUnit";

export default function GetAllWeightUnit() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.weightUnit);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      id: 2,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY"),
    },

    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-wightUnit"}>
              <div
                onClick={() => {
                  dispatch(editWeightUnit(item));
                  showModal();
                }}
                className='flex items-center gap-2 cursor-pointer'
              >
                <EditOutlined className='gray-600 rounded-md' />
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
              permission={"delete-wightUnit"}
              deleteThunk={deleteWeightUnit}
              loadThunk={loadALLWeightUnit}
              className='bg-white text-black'
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
    dispatch(loadALLWeightUnit());
    return () => {
      dispatch(clearWeightList());
    };
  }, [dispatch]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Weight Unit"}
      extra={
        <CreateDrawer
          permission={"create-wightUnit"}
          title={"Create Weight Unit"}
          width={35}
        >
          <AddWeightUnit />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-wightUnit"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          setPageConfig={setPageConfig}
          title={"Weight Unit"}
          //   filters={filters}
        />
      </UserPrivateComponent>
      <Modal
        title={<div className='border-b pb-5'>Update Weight Unit</div>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <UpdateWeightUnit handleCancel={handleCancel} />
      </Modal>
    </Card>
  );
}

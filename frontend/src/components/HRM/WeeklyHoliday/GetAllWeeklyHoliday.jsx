import Card from "@/UI/Card";
import ViewBtn from "@/components/Buttons/ViewBtn";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { deleteWeeklyHoliday, editWeeklyHoliday, loadAllWeeklyHolidayPaginated } from "@/redux/rtk/features/hrm/holiday/weeklyHolidaySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddWeeklyHoliday from "./AddWeeklyHoliday";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import UpdateWeeklyHoliday from "./UpdateWeeklyHoliday";



export default function GetAllWeeklyHoliday() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.weeklyHoliday);
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
        title: "Start Day",
        dataIndex: "startDay",
        key: "startDay",
    },
    {
        id: 3,
        title: "End Day",
        dataIndex: "endDay",
        key: "endDay",
    },

    
    {
      id: 4,
      title: "",
      dataIndex: "",
      key: "action",
      render: (item) =>[
        {
          label: (
            <UserPrivateComponent permission={"update-weeklyHoliday"}>
              <div
                onClick={() => {
                  dispatch(editWeeklyHoliday(item));
                  showModal();
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
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
                id:item.id,
                status:item.status,
              }}
              title={item.status === "true" ? "Delete" : "Show"}
              permission={"delete-weeklyHoliday"}
              deleteThunk={deleteWeeklyHoliday}
              loadThunk={loadAllWeeklyHolidayPaginated}
              query={pageConfig}
              className='bg-white text-black'
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
  },
];

  


  useEffect(() => {
    dispatch(loadAllWeeklyHolidayPaginated(pageConfig))
  }, [dispatch, pageConfig]);

  return (
  <>  
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Weekly Holiday"}
      extra={
        <CreateDrawer
          permission={"create-weeklyHoliday"}
          title={"Create Weekly Holiday"}
          width={35}
        >
            <AddWeeklyHoliday/>
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-weeklyHoliday"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          setPageConfig={setPageConfig}
          title={"Weekly Holiday List"}
        />
      </UserPrivateComponent>
    </Card>
    <Modal
        title="Update Weekly Holiday"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <UpdateWeeklyHoliday handleCancel={handleCancel} />
    </Modal>
  </>  
  );
}


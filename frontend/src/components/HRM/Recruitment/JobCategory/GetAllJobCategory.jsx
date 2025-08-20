import Card from '@/UI/Card';
import CreateDrawer from '@/components/CommonUi/CreateDrawer';
import TableComponent from '@/components/CommonUi/TableComponent';
import UserPrivateComponent from '@/components/PrivacyComponent/UserPrivateComponent';
import { deleteJobCategory, editJobCategory, loadAllJobCategoryPaginated } from '@/redux/rtk/features/hrm/jobCategory/jobCategorySlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddJobCategory from './AddJobCategory';
import CommonDelete from '@/components/CommonUi/CommonDelete';
import { EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import UpdateJobCategory from './UpdateJobCategory';

export default function GetAllJobCategory() {
   const dispatch = useDispatch();
   const {list, loading,total} = useSelector(state=> state.jobCategory);
   const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: 'true',
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
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "jobCategoryName",
      key: "jobCategoryName",
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-jobCategory"}>
              <div
                onClick={() => {
                  dispatch(editJobCategory(item));
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
              title={item.status === "true" ? "Hide" : "Show"}
              permission={"delete-jobCategory"}
              deleteThunk={deleteJobCategory}
              loadThunk={loadAllJobCategoryPaginated}
              query={pageConfig}
              className='bg-white text-black'
            />
          ),
          key: "delete",
        },
      ],
      csvOff:true,
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
    dispatch(loadAllJobCategoryPaginated(pageConfig))
  }, [dispatch,pageConfig]);

  return (
   <>
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Job Category"}
      extra={
        <CreateDrawer
          permission={"create-jobCategory"}
          title={"Create Job Category"}
          width={35}
        >
           <AddJobCategory/>
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-jobCategory"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          filters={filters}
          setPageConfig={setPageConfig}
          title={"Job Category List"}
          isSearch
        />
      </UserPrivateComponent>
    </Card>

    <Modal
        title="Update Job Category"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <UpdateJobCategory handleCancel={handleCancel} />
    </Modal>
   </>
  );
}

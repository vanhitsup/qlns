

import Card from '@/UI/Card';
import CreateDrawer from '@/components/CommonUi/CreateDrawer';
import TableComponent from '@/components/CommonUi/TableComponent';
import UserPrivateComponent from '@/components/PrivacyComponent/UserPrivateComponent';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CommonDelete from '@/components/CommonUi/CommonDelete';
import { EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { deleteJobWorkExperience, editJobWorkExperience, loadAllJobWorkExperiencePaginated } from '@/redux/rtk/features/hrm/jobWorkExperience/jobWorkExperienceSlice';
import AddJobWorkExperience from './AddJobWorkExperience';
import UpdateJobWorkExperience from './UpdateJobWorkExperience';


export default function GetAllJobWorkExperience() {
   const dispatch = useDispatch();
   const {list, loading,total} = useSelector(state=> state.jobWorkExperience);
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
      title: "Work Experience	",
      dataIndex: "workExperience",
      key: "workExperience",
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-jobWorkExperience"}>
              <div
                onClick={() => {
                  dispatch(editJobWorkExperience(item));
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
              permission={"delete-jobWorkExperience"}
              deleteThunk={deleteJobWorkExperience}
              loadThunk={loadAllJobWorkExperiencePaginated}
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
    dispatch(loadAllJobWorkExperiencePaginated(pageConfig))
  }, [dispatch,pageConfig]);

  return (
   <>
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Job Work Experience"}
      extra={
        <CreateDrawer
          permission={"create-jobWorkExperience"}
          title={"Create Job Work Experience"}
          width={35}
        >
         <AddJobWorkExperience/>
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-jobWorkExperience"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          filters={filters}
          setPageConfig={setPageConfig}
          title={"Job Work Experience List"}
        />
      </UserPrivateComponent>
    </Card>

    <Modal
        title="Update Job Work Experience"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <UpdateJobWorkExperience handleCancel={handleCancel} />
    </Modal>
   </>
  );
}

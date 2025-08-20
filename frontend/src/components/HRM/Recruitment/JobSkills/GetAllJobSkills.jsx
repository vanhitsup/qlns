
import Card from '@/UI/Card';
import CreateDrawer from '@/components/CommonUi/CreateDrawer';
import TableComponent from '@/components/CommonUi/TableComponent';
import UserPrivateComponent from '@/components/PrivacyComponent/UserPrivateComponent';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CommonDelete from '@/components/CommonUi/CommonDelete';
import { EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { deleteJobSkills, editJobSkills, loadAllJobSkills, loadAllJobSkillsPaginated } from '@/redux/rtk/features/hrm/jobSkills/jobSkillsSlice';
import AddJobSkills from './AddJobSkills';
import { loadAllJobCategory } from '@/redux/rtk/features/hrm/jobCategory/jobCategorySlice';
import UpdateJobSkills from './UpdateJobSkills';

export default function GetAllJobSkills() {
   const dispatch = useDispatch();
   const {list, loading,total} = useSelector(state => state.jobSkills);
   const {list:jobCategory,loading:jobCategoryLoading} = useSelector(state => state.jobCategory)
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: 'true',
  });
  
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
      title: "Job Category",
      dataIndex: "jobCategory",
      key: "jobCategory",
      render:(jobCategory)=>jobCategory.jobCategoryName,
      renderCsv:(jobCategory)=>jobCategory.jobCategoryName,
    },
    {
      id: 2,
      title: "Skill",
      dataIndex: "jobSkillName",
      key: "jobSkillName",
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-jobSkills"}>
              <div
                onClick={() => {
                  dispatch(editJobSkills(item));
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
              permission={"delete-jobSkills"}
              deleteThunk={deleteJobSkills}
              loadThunk={loadAllJobSkillsPaginated}
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
    {
        key: "jobCategoryId",
        label: "Job Category",
        type: "select",
        options: jobCategory?.map((item) => ({
          label: item?.jobCategoryName,
          value: item?.id,
        })),
        className: "min-w-[140px] max-w-[150px]",
        popupClassName: "w-[200px]",
      },
  ];


  useEffect(() => {
    dispatch(loadAllJobSkillsPaginated(pageConfig))
  }, [dispatch,pageConfig]);

  useEffect(() => {
    dispatch(loadAllJobCategory())
  }, [dispatch]);

  return (
   <>
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Job Skills"}
      extra={
        <CreateDrawer
          permission={"create-jobSkills"}
          title={"Create Job Skills"}
          width={30}
        >
         <AddJobSkills/>
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-jobSkills"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          filters={filters}
          setPageConfig={setPageConfig}
          title={"Job Skills List"}
          isSearch
        />
      </UserPrivateComponent>
    </Card>

    <Modal
        title="Update Job Skills"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <UpdateJobSkills handleCancel={handleCancel} />
    </Modal>
   </>
  );
}

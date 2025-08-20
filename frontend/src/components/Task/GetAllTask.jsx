import { useGetTasksQuery } from "@/redux/rtk/features/GlobalTask/globalTaskApi";
import { useState } from "react";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import TableComponent from "@/components/CommonUi/TableComponent";
import Card from "@/UI/Card";
import TaskCard from "@/components/Task/Card";
import TaskModal from "@/components/HRM/Project/kanbanBoard/TaskModal";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/utils/functions";
import { editTask } from "@/redux/rtk/features/task/taskSlice";

export default function GetAllTask() {
  const dispatch = useDispatch();
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });
  const { data, error, isLoading, isSuccess, isError } =
    useGetTasksQuery(pageConfig);
  const { edit } = useSelector((state) => state.task);

  const columns = [
    {
      id: 1,
      title: "id",
      dataIndex: "id",
      key: "task",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      render: (name, item) => (
        <span
          className="cursor-pointer"
          onClick={() => dispatch(editTask(item))}>
          {name}
        </span>
      ),
      key: "name",
      tdClass: "whitespace-normal",
    },
    {
      title: "Priority",
      key: "priority",
      dataIndex: "priority",
      render: (priority) => priority?.name,
      renderCsv: (priority) => priority?.name,
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
    },
    {
      id: 3,
      title: "Status",
      key: "status",
      render: ({ type, crmTaskStatus, taskStatus }) => {
        const isCrm = type === "crm";
        return isCrm ? crmTaskStatus?.taskStatusName : taskStatus?.name;
      },
      renderCsv: ({ type, crmTaskStatus, taskStatus }) => {
        const isCrm = type === "crm";
        return isCrm ? crmTaskStatus?.taskStatusName : taskStatus?.name;
      },
    },
  ];

  const filters = [
    {
      label: "Status",
      key: "status",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      mode: "single",
      className: "min-w-[80px] max-w-[150px]",
      popupClassName: "w-[150px]",
    },
  ];
  const handleMyTask = () => {
    setPageConfig((prev) => {
      if (prev.query !== "myTask") {
        return {
          ...prev,
          page: 1,
          count: 10,
          query: "myTask",
        };
      } else {
        return {
          page: 1,
          count: 10,
        };
      }
    });
  };
  const extraFilter = (
    <div
      onClick={handleMyTask}
      className={cn(
        "h-8 bg-[#D7D7D7] px-2 text-center rounded-[5px] flex items-center cursor-pointer",
        { "bg-[#1890ff] text-white": pageConfig.query === "myTask" }
      )}>
      My Task
    </div>
  );
  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0"
      headClass="border-none"
      title={"Task"}>
      <UserPrivateComponent permission={"readAll-task"}>
        <TableComponent
          list={data?.getAllTask}
          total={data?.totalTask}
          columns={columns}
          loading={isLoading}
          setPageConfig={setPageConfig}
          title="Task list"
          filters={filters}
          isSearch
          card={(item) => <TaskCard data={item} />}
          extraFilter={extraFilter}
          defaultView={"card"}
        />
      </UserPrivateComponent>
      <TaskModal edit={edit} />
    </Card>
  );
}

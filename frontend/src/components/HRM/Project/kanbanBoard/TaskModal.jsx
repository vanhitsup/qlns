import Modal from "@/UI/Modal";
import { GoTasklist } from "react-icons/go";

import TaskSingle from "@/components/HRM/Project/kanbanBoard/TaskSingle";
import { useDispatch } from "react-redux";
import { Input, Select } from "antd";
import { useUpdateProjectTaskMutation } from "@/redux/rtk/features/hrm/projectManagement/project/projectTask/projectTaskApi";
// import TaskSingleCRM from "./TaskSingleCRM";
import { useGetAllTaskStatusByProjectIdQuery } from "@/redux/rtk/features/hrm/projectManagement/project/taskStatus/taskStatusApi";
import { editTask } from "@/redux/rtk/features/task/taskSlice";

export default function TaskModal({ edit }) {
  const dispatch = useDispatch();
  const [updateTask] = useUpdateProjectTaskMutation();
  const { data: list, isLoading: loading } =
    useGetAllTaskStatusByProjectIdQuery(edit?.projectId);
  const handleChange = (e) => {
    const value = String(e.target.value).trim();
    if (value !== edit.name) {
      updateTask({ id: edit.id, values: { name: value } });
    }
  };
  const handleUpdate = (value) => {
    updateTask({ id: edit.id, values: { taskStatusId: value } });
  };
  return (
    <>
      <Modal
        title={
          <span className="w-full">
            <div className="flex gap-2">
              <GoTasklist size={23} className="m-2 mx-0" />
              <span className="flex flex-col w-full">
                <Input
                  defaultValue={edit?.name}
                  className="bg-transparent focus:bg-white w-full py-2 pl-0 focus:pl-2"
                  bordered={false}
                  onBlur={handleChange}
                />
                <span className="text-xs taskBoard">
                  in list{" "}
                  {edit?.taskStatus?.name ? (
                    <Select
                      defaultValue={edit?.taskStatus?.id}
                      onChange={handleUpdate}
                      className="w-40"
                      loading={loading}>
                      {list?.map((status) => (
                        <Select.Option key={status.id} value={status.id}>
                          {status.name}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    edit?.crmTaskStatus?.taskStatusName
                  )}
                </span>
              </span>
            </div>
          </span>
        }
        open={edit}
        onClose={() => dispatch(editTask(null))}
        className="md:w-[80%] xl:w-[50%] p-2">
        {edit?.type === "crm" ? (
          // <TaskSingleCRM id={edit.id} />
          ""
        ) : (
          <TaskSingle data={edit} />
        )}
      </Modal>
    </>
  );
}

import { Button, DatePicker, Select } from "antd";
import CustomButton from "@/UI/Button";
import {
  projectTaskApi,
  useGetProjectTaskQuery,
  useUpdateProjectTaskMutation,
} from "@/redux/rtk/features/hrm/projectManagement/project/projectTask/projectTaskApi";
import List from "@/UI/List";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import Loader from "@/components/Loader/Loader";
import CommonDelete from "@/components/CommonUi/CommonDelete";
import { useDispatch } from "react-redux";
import { useGetTaskPrioritiesQuery } from "@/redux/rtk/features/hrm/projectManagement/project/priority/priorityApi";
import { useGetMilestoneByProjectIdQuery } from "@/redux/rtk/features/hrm/projectManagement/project/milestone/milestoneApi";
import dayjs from "dayjs";
import { BiEdit } from "react-icons/bi";
import MemberModal from "./MemberModal";
import Editor from "@/UI/Editor/Editor";
import { editTask } from "@/redux/rtk/features/task/taskSlice";

export default function TaskSingle({ data }) {
  const dispatch = useDispatch();
  const editorStateRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: task, isLoading } = useGetProjectTaskQuery(data.id);
  const [updateTask, { isLoading: updateLoading }] =
    useUpdateProjectTaskMutation();
  const { data: taskPriority, isLoading: taskPriorityLoading } =
    useGetTaskPrioritiesQuery();
  const { data: milestoneList, isLoading: milestoneLoading } =
    useGetMilestoneByProjectIdQuery(data?.projectId);

  const onFinish = async () => {
    try {
      const resp = await updateTask({
        id: data.id,
        values: {
          description: editorStateRef.current,
        },
      });
      if (resp.data && !resp.error) {
        setIsEdit(false);
      }
    } catch (error) {}
  };

  const editToggle = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = async (name, value) => {
    await updateTask({ id: data.id, values: { [name]: value } });
  };

  const onChange = (editorState) => {
    editorStateRef.current = JSON.stringify(editorState);
  };

  return (
    <>
      {!isLoading && task ? (
        <div className="flex justify-between gap-4 mt-4">
          <div className="w-[65%]">
            <div className="flex justify-between mb-2">
              <h1 className="font-semibold flex gap-2 items-center">
                <CgDetailsMore size={23} />
                Task Details
              </h1>
              <div className="flex gap-1">
                <CustomButton
                  onClick={editToggle}
                  className="inline w-auto px-2 py-1 bg-gray-400/10"
                  color="gray">
                  <span className="text-xs text-gray-500">Edit </span>
                </CustomButton>
                <CommonDelete
                  permission={"delete-task"}
                  button={
                    <CustomButton
                      className="inline w-auto px-2 py-1 bg-gray-400/10"
                      color="gray">
                      <span className="text-xs text-gray-500">Delete </span>
                    </CustomButton>
                  }
                  confirmMessage="Are you sure you want to delete this task?"
                  id={task.id}
                  deleteThunk={
                    projectTaskApi.endpoints.deleteProjectTask.initiate
                  }
                  onSuccess={() => dispatch(editTask(null))}
                />
              </div>
            </div>
            {isEdit ? (
              <>
                <Editor
                  onChange={onChange}
                  isEdit
                  defaultContent={task?.description}
                />
                <div className={"flex gap-2"}>
                  <Button
                    htmlType={"submit"}
                    loading={updateLoading}
                    type="primary"
                    onClick={onFinish}>
                    Save
                  </Button>
                  <Button onClick={editToggle} htmlType="button" type="default">
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <Editor content={task?.description} />
            )}
          </div>
          <div className="w-[35%] bg-gray-400/10 p-4 rounded">
            <List
              labelClassName="w-[30%]"
              listClassName="border-b pb-2"
              className="pt-0"
              list={[
                {
                  label: "Project",
                  value: task?.project?.name,
                },
                {
                  label: "Priority",
                  value: (
                    <div className="taskBoard -mt-2 -ml-3 ">
                      <Select
                        onChange={(e) => handleChange("priorityId", e)}
                        bordered={false}
                        defaultValue={task?.priorityId}
                        loading={taskPriorityLoading}
                        className="bg-transparent p-0 focus:bg-white"
                        placeholder={"Select Priority"}>
                        {taskPriority?.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  ),
                },
                {
                  label: "Milestone",
                  value: (
                    <div className="taskBoard -mt-2 -ml-3">
                      <Select
                        onChange={(e) => handleChange("milestoneId", e)}
                        bordered={false}
                        defaultValue={task?.milestoneId}
                        loading={milestoneLoading}
                        className="bg-transparent p-0 "
                        placeholder={"Select Milestone"}>
                        {milestoneList?.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  ),
                },
                {
                  label: "Start Date",
                  value: (
                    <div className="taskBoard -mt-2 -ml-3">
                      <DatePicker
                        placeholder="Start Date"
                        className="focus:bg-white"
                        onChange={(e) =>
                          handleChange(
                            "startDate",
                            dayjs(e).format("YYYY-MM-DD")
                          )
                        }
                        defaultValue={dayjs(task?.startDate)}
                        allowClear={false}
                      />
                    </div>
                  ),
                },
                {
                  label: "End Date",
                  value: (
                    <div className="taskBoard -mt-2 -ml-3">
                      <DatePicker
                        className="focus:bg-white"
                        onChange={(e) =>
                          handleChange("endDate", dayjs(e).format("YYYY-MM-DD"))
                        }
                        defaultValue={dayjs(task?.endDate)}
                        allowClear={false}
                      />
                    </div>
                  ),
                },
                {
                  label: "Team",
                  value: task?.team?.projectTeamName,
                },
                {
                  label: "Members",
                  value: (
                    <div className="relative flex ">
                      <div>
                        {task?.assignedTask?.map((item) => (
                          <div className="flex flex-col" key={item.id}>
                            <Link
                              className="my-[1px]"
                              to={`/admin/staff/${item.user.id}`}>
                              <span className="inline px-1 text-gray-500 bg-white rounded-sm">
                                {item.user?.username}
                              </span>
                            </Link>
                          </div>
                        ))}
                      </div>
                      <span className="w-full flex justify-end mt-1">
                        <BiEdit
                          size={18}
                          onClick={() => setIsModalOpen(true)}
                        />
                      </span>
                      <MemberModal
                        task={task}
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        updateTask={updateTask}
                        updateLoading={updateLoading}
                      />
                    </div>
                  ),
                },
              ]}></List>
          </div>
        </div>
      ) : (
        <Loader className="h-full" />
      )}
    </>
  );
}

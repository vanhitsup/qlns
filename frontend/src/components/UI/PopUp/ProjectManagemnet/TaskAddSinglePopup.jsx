import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import AddTaskPriority from "@/components/HRM/Project/TaskPriority/AddTaskPriority";
import AddTeam from "@/components/HRM/Project/Team/AddTeam";
import { useGetMilestoneByProjectIdQuery } from "@/redux/rtk/features/hrm/projectManagement/project/milestone/milestoneApi";
import { useAddProjectTaskMutation } from "@/redux/rtk/features/hrm/projectManagement/project/projectTask/projectTaskApi";
import { useGetProjectTeamByProjectIdQuery } from "@/redux/rtk/features/hrm/projectManagement/project/projectTeam/projectTeamApi";
import { useGetTaskPrioritiesQuery } from "@/redux/rtk/features/hrm/projectManagement/project/priority/priorityApi";
import BigDrawer from "../../../Drawer/BigDrawer";
import AddMilestone from "@/components/HRM/Project/Milestone/AddMilestone";

const TaskAddSinglePopup = ({ projectId, taskStatusId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { data: taskPriority, isLoading: taskPriorityLoading } =
    useGetTaskPrioritiesQuery();
  const { data: projectTeamList, isLoading: projectTeamLoading } =
    useGetProjectTeamByProjectIdQuery(projectId);
  const { data: milestoneList, isLoading: milestoneLoading } =
    useGetMilestoneByProjectIdQuery(projectId);
  const [teamUserList, setTeamUserList] = useState([]);
  const [addSingleProjectTasks, { isLoading }] = useAddProjectTaskMutation();

  const onFinish = async (values) => {
    const infoData = {
      ...values,
      taskStatusId: parseInt(taskStatusId),
      projectId: parseInt(projectId),
      type: "project",
    };

    const resp = await addSingleProjectTasks(infoData);

    if (resp.data && !resp.error) {
      setIsModalOpen(false);
      form.resetFields();
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <div className="text-center">
        <button
          className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
          type="primary"
          onClick={showModal}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </button>
      </div>
      <Modal
        width={`40%`}
        title={`Add Task`}
        okButtonProps={{ style: { display: "none" } }}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout={"vertical"}
          style={{ marginBottom: "20px" }}
          eventKey="department-form"
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Task Name"
            rules={[
              {
                required: true,
                message: "Please input task name!",
              },
            ]}
            name="name"
            
          >
            <Input placeholder="Task Name" />
          </Form.Item>
          <div className="flex gap-5 justify-between"> 

          <Form.Item
            name="milestoneId"
            className="w-full"
            label={
              <div className="flex justify-between">
                <span>Milestone</span>
                <BigDrawer title={"Milestone"}>
                  <AddMilestone isFixed={true} projectId={projectId} />
                </BigDrawer>
              </div>
            }
          >
            <Select
              className=""
              loading={milestoneLoading}
              placeholder="Select Milestone"
              mode="single"
            >
              {milestoneList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            className="w-full"
            name="priorityId"
            label={
              <div className="flex justify-between">
                <span>Priority</span>
                <BigDrawer width={30} title={"Task priority"}>
                  <AddTaskPriority />
                </BigDrawer>
              </div>
            }
          >
            <Select
              className="mr-2"
              placeholder="Select Priority"
              loading={taskPriorityLoading}
              mode="single"
            >
              {taskPriority?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          </div>

          <div className="flex gap-5 justify-between"> 
          <Form.Item
            className="w-full"
            style={{ marginBottom: "10px" }}
            label={
              <div className="flex justify-between">
                <span>Team</span>
                <BigDrawer title={"Team"}>
                  <AddTeam projectId={projectId} />
                </BigDrawer>
              </div>
            }
            name="teamId"
          >
            <Select
              className="mr-2"
              placeholder="Select Team"
              loading={projectTeamLoading}
              onChange={(value) => {
                // eslint-disable-next-line array-callback-return
                projectTeamList?.map((item) => {
                  if (item.id === value) {
                    // make object for setTeamUserList
                    const projectTeamMember = item.projectTeamMember.map(
                      (item) => {
                        return {
                          userId: item.userId,
                          user: item.user,
                        };
                      },
                    );
                    setTeamUserList(projectTeamMember);
                  }
                });
              }}
              mode="single"
            >
              {projectTeamList?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.projectTeamName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            className="w-full"
            style={{ marginBottom: "10px" }}
            label="Team members"
            name="assignedTask"
          >
            <Select
              className="mr-2"
              placeholder="Select member"
              mode="multiple"
              optionFilterProp="children"
              maxTagCount='responsive'
            >
              {teamUserList?.map((item) => (
                <Select.Option key={item.userId} value={item.userId}>
                  {item.user.firstName + " " + item.user.lastName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          </div>
          <div className="flex gap-5 justify-between"> 
          <Form.Item
            className="w-full"
            style={{ marginBottom: "10px" }}
            label="Start date"
            name="startDate"
            valuePropName="startDate"
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            className="w-full"
            style={{ marginBottom: "10px" }}
            label="End date"
            name="endDate"
            valuePropName="endDate"
          >
            <DatePicker />
          </Form.Item>
          </div>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Description"
            name="description"
          >
            <Input.TextArea rows={5} placeholder="Description" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "20px" }}
            className="w-[30%] mx-auto"
          >
            <Button
              block
              type="primary"
              size="middle"
              htmlType="submit"
              loading={isLoading}
            >
              Add Now
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default TaskAddSinglePopup;

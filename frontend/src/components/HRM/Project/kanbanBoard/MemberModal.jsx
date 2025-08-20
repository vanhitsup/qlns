import Button from "@/UI/Button";
import Modal from "@/UI/Modal";
import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";

export default function MemberModal({
  task,
  open,
  onClose,
  updateTask,
  updateLoading,
}) {
  const [members, setMembers] = useState([]);
  const [form] = Form.useForm();

  const handleChange = (teamId) => {
    const member = task?.project?.projectTeam?.find(
      (item) => item.id === teamId,
    )?.projectTeamMember;
    setMembers(member);
    form.setFieldValue("assignedTask", []);
  };
  const onFinish = async (values) => {
    const resp = await updateTask({ id: task.id, values: values });
    if (resp.data && !resp.error) {
      onClose();
    }
  };
  useEffect(() => {
    if (task?.team && open) {
      setMembers(task?.team?.projectTeamMember);
    }
  }, [task, open]);

  useEffect(() => {
    if ((task, open)) {
      form.setFieldsValue({
        teamId: task?.team?.id,
        assignedTask: task?.assignedTask?.map((item) => item.userId),
      });
    }
  }, [form, task, open]);
  return (
    <div>
      <Modal title="Add Members" open={open} onClose={onClose}>
        <div className=" bg-white py-4 px-2 rounded flex flex-col gap-2 min-w-[200px]">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="teamId">
              <Select
                onChange={handleChange}
                bordered={false}
                defaultValue={task?.priorityId}
                placeholder={"Select Team"}
                className="bg-transparent p-0 focus:bg-white"
              >
                {task?.project?.projectTeam?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.projectTeamName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="assignedTask">
              <Select
                placeholder="Select Member"
                bordered={false}
                mode={"multiple"}
                className="bg-transparent p-0 focus:bg-white"
                maxTagCount="responsive"
              >
                {members.map((item) => (
                  <Select.Option key={item.userId} value={item.userId}>
                    {item?.user?.username}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button loading={updateLoading} type="submit" color="primary">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

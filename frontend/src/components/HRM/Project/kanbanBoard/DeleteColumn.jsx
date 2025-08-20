import { useDeleteTaskStatusMutation } from "@/redux/rtk/features/hrm/projectManagement/project/taskStatus/taskStatusApi";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import "./styles.css";

const DeleteColumn = ({ id, projectId }) => {
  const [deleteTaskStatus] = useDeleteTaskStatusMutation();

  const onDelete = async () => {
    await deleteTaskStatus(id);
  };

  const content = (
    <div className="">
      <Button className="text-sm text-red-500 ml-2" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );

  return (
    <Popover
      content={content}
      title="Options"
      placement="left"
      trigger={"click"}
    >
      <button
        type="primary"
        className="px-2 text-md text-indigo-500 rounded hover:text-red-500"
      >
        <DeleteOutlined />
      </button>
    </Popover>
  );
};
export default DeleteColumn;

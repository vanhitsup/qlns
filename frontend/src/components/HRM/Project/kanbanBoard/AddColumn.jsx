import AddTaskStatus from "@/components/HRM/Project/TaskStatus/AddTaskStatus";
import { PlusSquareFilled } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
import { useState } from "react";

const AddColumn = ({ projectId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="new-card mr-10">
      <Tooltip title="Add Column">
        <button
          className="flex items-center justify-center w-6 h-6 ml-auto text-violet-500 rounded hover:bg-violet-500 hover:text-indigo-100"
          type="primary"
          onClick={showModal}
        >
          <PlusSquareFilled style={{ fontSize: "35px" }} />
        </button>
      </Tooltip>
      <Modal
        title="Add Column"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <AddTaskStatus projectId={projectId} isFixed={true} />
      </Modal>
    </div>
  );
};
export default AddColumn;

import { Button, Popover } from "antd";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  deleteJobApplicationStatus,
  loadAllJobApplicationStatus,
} from "@/redux/rtk/features/hrm/jobApplicationStatus/jobApplicationStatusSlice";
import { useDispatch } from "react-redux";

const DeleteJobApplicationStatus = ({ id }) => {
  const dispatch = useDispatch();

  const onDelete = async () => {
    const resp = await dispatch(deleteJobApplicationStatus({ id }));
    console.log(resp);
    if (resp.payload.message === "success") {
      dispatch(loadAllJobApplicationStatus());
    }
  };

  const content = (
    <div>
      <button className="text-sm font-medium" onClick={onDelete}>
        Delete
      </button>
    </div>
  );

  return (
    <Popover content={content} placement="left" trigger={"click"}>
      <button
        type="primary"
        className=" p-2 text-indigo-500 rounded hover:bg-gray-300">
        <HiOutlineDotsVertical />
      </button>
    </Popover>
  );
};

export default DeleteJobApplicationStatus;

import { Tooltip } from "antd";
import { FaRegStickyNote } from "react-icons/fa";
import { Link } from "react-router-dom";

const TaskBtn = ({ path }) => {
  return (
    <div>
      <Tooltip title='Task Status'>
        <Link to={path}>
          <button className='bg-amber-500 hover:bg-amber-700 text-white font-bold  p-1 rounded'>
            <FaRegStickyNote />
          </button>
        </Link>
      </Tooltip>
    </div>
  );
};

export default TaskBtn;

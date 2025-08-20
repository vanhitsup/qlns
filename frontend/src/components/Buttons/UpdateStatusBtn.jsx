import { Tooltip } from "antd";
import { CiBookmarkRemove } from "react-icons/ci";
import { Link } from "react-router-dom";

const UpdateStatusBtn = ({ path,status }) => {
  return (
    <div>
      <Tooltip title='Status Update'>
        <Link to={path} className="flex items-center gap-2">
          <button className=' bg-purple-500 hover:bg-purple-700 text-white font-bold  p-1 rounded'>
            <CiBookmarkRemove /> 
          </button>
          <span className="border px-1 text-gray-600 bg-gray-100 rounded">{status}</span>
        </Link>
      </Tooltip>
    </div>
  );
};

export default UpdateStatusBtn;

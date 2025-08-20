import { Tooltip } from "antd";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

const UpdateBtn = ({ path }) => {
  return (
    <div>
      <Tooltip title='Update'>
        <Link to={path}>
          <button className='bg-teal-500 hover:bg-teal-700 text-white font-bold  p-1 py-1 rounded'>
            <BsPencilSquare />
          </button>
        </Link>
      </Tooltip>
    </div>
  );
};

export default UpdateBtn;

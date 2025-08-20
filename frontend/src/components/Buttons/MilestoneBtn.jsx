import { Tooltip } from "antd";
import { MdOutlineSignpost } from "react-icons/md";
import { Link } from "react-router-dom";

const MilestoneBtn = ({ path }) => {
  return (
    <div>
      <Tooltip title='Milestone'>
        <Link to={path}>
          <button className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold  p-1 rounded'>
            <MdOutlineSignpost />
          </button>
        </Link>
      </Tooltip>
    </div>
  );
};

export default MilestoneBtn;

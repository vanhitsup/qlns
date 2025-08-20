import { Tooltip } from "antd";
import { FaTrello } from "react-icons/fa";
import { Link } from "react-router-dom";

const KanbanBtn = ({ path }) => {
  return (
    <div>
      <Tooltip title='Kanban'>
        <Link to={path}>
          <button className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold  p-1 rounded'>
            <FaTrello />
          </button>
        </Link>
      </Tooltip>
    </div>
  );
};

export default KanbanBtn;

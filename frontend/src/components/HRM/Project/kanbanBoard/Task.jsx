import dayjs from "dayjs";
import React from "react";
import "./styles.css";

const Task = ({ taskS: task, btnLoading, btnId, handleDeleteTask }) => {
  return (
    <div className="task new-column-card" draggable="true">
      <div className="task__tags ">
        {task.priority?.name ? (
          <span className="task__tag task__tag--illustration">
            {task.priority?.name}
          </span>
        ) : (
          <span></span>
        )}
      </div>
      <p className="mt-2 txt-color font-semibold">{task.name}</p>
      <div className="task__stats">
        <span>
          {task.startDate && task.endDate && (
            <time>
              {dayjs(task.startDate).format("DD/MM/YYYY")} -{" "}
              {dayjs(task.endDate).format("DD/MM/YYYY")}
            </time>
          )}
        </span>
      </div>
    </div>
  );
};

export default Task;

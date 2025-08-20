import { editTask } from "@/redux/rtk/features/task/taskSlice";
import { Tag } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";

export default function TaskCard({ data, projectId }) {
  const dispatch = useDispatch();
  const priorityColors = {
    High: "#ff6666", // Red
    Highest: "#ff3333", // Darker Red
    Low: "#66cc66", // Green
    Lowest: "#339933", // Darker Green
    Normal: "#6666ff", // Blue
  };
  const color = priorityColors[data?.priority?.name] || "#cccccc";
  return (
    <>
      <div
        onClick={() => dispatch(editTask(data))}
        className="border p-2 rounded-lg flex flex-col gap-2 bg-white cursor-pointer">
        <div className="flex justify-between">
          <div className="text-sm">
            <span className="">Type:</span> {data?.type}
          </div>
          <div>
            {data.priority && <Tag color={color}>{data?.priority?.name}</Tag>}
          </div>
        </div>
        <div className="flex-grow py-2">{data?.name}</div>
        <div className="flex justify-between text-gray-500 border-t pt-1 flex-wrap">
          <div className="flex">
            <p className="text-sm">{moment(data?.startDate).format("ll")}</p>
            <span className="mx-1">to</span>
            <p className="text-sm">{moment(data?.endDate).format("ll")}</p>
          </div>
          {(data?.crmTaskStatus?.taskStatusName || data?.taskStatus?.name) && (
            <p className="text-sm">
              <span className="">Status:</span>{" "}
              {data?.type === "crm"
                ? data?.crmTaskStatus?.taskStatusName
                : data?.taskStatus?.name}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

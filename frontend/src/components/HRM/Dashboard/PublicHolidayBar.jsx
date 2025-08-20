import { List } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadAllPublicHoliday } from "@/redux/rtk/features/hrm/holiday/publicHolidaySlice";

const PublicHolidayBar = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.publicHoliday);

  useEffect(() => {
    dispatch(loadAllPublicHoliday());
  }, [dispatch]);
  return (
    <div>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={list || []}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                item.startDate === item.endDate ? (
                  <div>
                    <div
                      style={{ height: "65px", width: "60px" }}
                      className="border-4 border-indigo-500/75 text-center"
                    >
                      <p className="text-xl font-medium txt-color-2">
                        {dayjs(item.startDate).format("DD")}
                      </p>
                      <p className="text-base font-medium txt-color-secondary ">
                        {dayjs(item.startDate).format("MMM")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div
                      style={{ height: "65px", width: "60px" }}
                      className="border-4 border-indigo-500/75 text-center"
                    >
                      <p className="text-xl font-medium txt-color-2">
                        {dayjs(item.startDate).format("DD")}
                      </p>
                      <p className="text-base font-medium txt-color-secondary ">
                        {dayjs(item.startDate).format("MMM")}
                      </p>
                    </div>
                    <span className="p-1">to</span>
                    <div
                      style={{ height: "65px", width: "60px" }}
                      className="border-4 border-indigo-500/75 text-center"
                    >
                      <p className="text-xl font-medium txt-color-2">
                        {dayjs(item.endDate).format("DD")}
                      </p>
                      <p className="text-base font-medium txt-color-secondary ">
                        {dayjs(item.endDate).format("MMM")}
                      </p>
                    </div>
                  </div>
                )
              }
              title={<p className="text-base font-medium ml-4">{item.name}</p>}
              description={
                <div className="flex items-center">
                  <p className="text-sm text-gray-500 ml-4">
                    {dayjs(item.date).format("DD/MM/YYYY")}
                  </p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
export default PublicHolidayBar;

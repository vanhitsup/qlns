import { loadAllQuickLinkPosition } from "@/redux/rtk/features/quickLink/quickLinkSlice";
import { loadAllStoreByUser } from "@/redux/rtk/features/store/storeSlice";
import { cn } from "@/utils/functions";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function QuickLink({ pageConfig, setPageConfig }) {
  const { list, defaultStore, loading } = useSelector((state) => state.store);
  const { list: quickLink } = useSelector((state) => state.quickLink);
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  const onCalendarChange = (dates) => {
    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    setPageConfig((prev) => {
      return {
        ...prev,
        startDate,
        endDate,
      };
    });
  };

  useEffect(() => {
    dispatch(loadAllStoreByUser());
  }, [dispatch]);

  const handleStoreChange = (value) => {
    setPageConfig((prev) => {
      return {
        ...prev,
        storeId: value,
      };
    });
  };

  useEffect(() => {
    dispatch(loadAllQuickLinkPosition());
  }, [dispatch]);

  return (
    <>
      <div className="border rounded-lg">
        <div className="flex justify-between items-center pt-2 px-3">
          <h1 className="text-[18px] w-[300px] dark:text-white font-semibold ">
            Quick link
          </h1>
          <div className="w-[300px] flex justify-center items-center">
            <span className="px-2 py-1 rounded font-semibold w-full">
              <Select
                className="w-full"
                mode="multiple"
                placeholder={`Select Store (Default: ${
                  defaultStore?.name || "All"
                })`}
                onChange={handleStoreChange}
                loading={loading}>
                {list?.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </span>
          </div>
          <div className="w-[300px]">
            <RangePicker
              className="range-picker"
              onCalendarChange={onCalendarChange}
              defaultValue={[
                dayjs(pageConfig.startDate, "YYYY-MM-DD"),
                dayjs(pageConfig.endDate, "YYYY-MM-DD"),
              ]}
            />
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-5 my-4">
          {quickLink
            ?.filter((item) => item.position)
            ?.map((item, index) => (
              <Link
                key={item.id}
                to={item.url}
                className={cn(
                  "flex flex-col items-center justify-center w-[120px] sm:w-[120px] lg:w-[150px] py-4 rounded-lg cursor-pointer text-[#2563eb] bg-[#2563eb]/10 hover:shadow",
                  { "bg-[#8b5cf6]/10 text-[#8b5cf6]": index % 2 === 0 }
                )}>
                <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                <p className="text-xs uppercase md:text-[12px] font-bold pt-[3px]">
                  {item.title}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

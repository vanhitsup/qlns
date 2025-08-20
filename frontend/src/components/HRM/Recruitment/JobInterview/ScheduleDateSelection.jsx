import { DatePicker } from "antd";
import dayjs from "dayjs";

export default function ScheduleDateSelection({ setPageConfig }) {
    const onChange = (value) => {
        const sDate = dayjs(value).format("YYYY-MM-DD");

        if (sDate !== "Invalid Date") {
            setPageConfig((prev) => {
                const prevData = { ...prev };
                if (prevData.query === "search") {
                    delete prevData.query;
                    delete prevData.key;
                }

                return { ...prevData, scheduleDate: sDate };
            });
        } else {
            setPageConfig((prev) => {
                const prevData = { ...prev };
                if (prevData.query === "search") {
                    delete prevData.query;
                    delete prevData.key;
                }

                return { ...prevData, scheduleDate: null };
            });
        }
    };
    return (
        <div>
            <DatePicker
                placeholder="Schedule Date"
                onChange={onChange}
                format={"YYYY-MM-DD"}
            />
        </div>
    );
}
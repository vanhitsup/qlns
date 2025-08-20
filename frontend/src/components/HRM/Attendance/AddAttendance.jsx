import { useEffect, useState } from "react";

import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  Typography,
} from "antd";
import dayjs from "dayjs";
import {
  loadAllStaff,
  loadSingleStaff,
} from "@/redux/rtk/features/hrm/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addAttendance,
  loadAllAttendance,
  loadAllAttendancePaginated,
} from "@/redux/rtk/features/hrm/attendance/attendanceSlice";
import { loadSingleShift } from "@/redux/rtk/features/hrm/shift/shiftSlice";
import Card from "@/UI/Card";
import UploadMany from "@/components/Card/UploadMany";

export default function AddAttendance() {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { Title } = Typography;
  const [form] = Form.useForm();

  const { list, user, loading } = useSelector((state) => state.users);

  const [inTimeDate, setInTimeDate] = useState({
    time: null,
    date: null,
  });
  const [outTimeDate, setOutTimeDate] = useState({
    time: null,
    date: null,
  });

  // make a new date variable from inTimeDate state which will contain date and time
  const inTimeDateNew = new Date(inTimeDate.date + "T" + inTimeDate.time + "Z");

  const outTimeDateNew = new Date(
    outTimeDate.date + "T" + outTimeDate.time + "Z"
  );

  const onFinish = async (values) => {
    console.log(values);
    setLoader(true);
    try {
      const FormData = {
        ip: values.ip,
        userId: values.userId,
        comment: values.comment,
        inTime:
          inTimeDateNew !== "Invalid Date"
            ? dayjs(inTimeDateNew).toISOString()
            : null,
        outTime:
          outTimeDateNew !== "Invalid Date"
            ? dayjs(outTimeDateNew).toISOString()
            : null,
      };

      const resp = await dispatch(addAttendance(FormData));
      if (resp.payload.message == "success") {
        form.resetFields();
        setInTimeDate("");
        setOutTimeDate("");
        dispatch(
          loadAllAttendancePaginated({ page: 1, count: 10, status: "true" })
        );
      }
    } catch (err) {
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    dispatch(loadAllStaff({ query: "all" }));
  }, [dispatch]);

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };

  return (
    <>
      <Title level={4} className="m-2 mt-5 mb-5 text-center">
        Add Manual Attendance
      </Title>
      {inTimeDate.time === null ||
      inTimeDate.date === null ||
      outTimeDate.time === null ||
      outTimeDate.date === null ? (
        <p className="text-center text-rose-500 text-sm font-medium mb-4">
          {" "}
          * Please fill Date and Time
        </p>
      ) : (
        ""
      )}
      <Form
        form={form}
        style={{ marginBottom: "40px" }}
        eventKey="shift-form"
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="mx-4">
        <div>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="User"
            name="userId"
            rules={[
              {
                required: true,
                message: "Please input your user!",
              },
            ]}>
            <Select
              onChange={(value, option) => {
                dispatch(loadSingleStaff(value));
              }}
              placeholder="Select User">
              {list?.map((user) => (
                <Select.Option key={user.id} value={user.id}>
                  {user.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Start Time"
            name="inTime"
            tooltip={
              user?.shift?.startTime
                ? ` Office Time Starts From ${user?.shift?.startTime} `
                : "Office Time is not Assigned"
            }>
            <div className="flex justify-between">
              <DatePicker
                format={"YYYY-MM-DD"}
                onChange={(date, dateString) =>
                  setInTimeDate({ ...inTimeDate, date: dateString })
                }
                disabledDate={disabledDate}
              />
              <TimePicker
                className="ml-4"
                format={"HH:mm:ss"}
                onChange={(time, timeString) =>
                  setInTimeDate({ ...inTimeDate, time: timeString })
                }
              />
            </div>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="End Time"
            tooltip={
              user?.shift?.endTime
                ? `Office Time Ends at ${user?.shift?.endTime}`
                : "Office Time is not Assigned"
            }
            name="outTime">
            <div className="flex justify-between">
              <DatePicker
                format={"YYYY-MM-DD"}
                onChange={(date, dateString) =>
                  setOutTimeDate({ ...outTimeDate, date: dateString })
                }
                disabledDate={disabledDate}
              />
              <TimePicker
                className="ml-4"
                format={"HH:mm:ss"}
                onChange={(time, timeString) =>
                  setOutTimeDate({ ...outTimeDate, time: timeString })
                }
              />
            </div>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Comment"
            name="comment">
            <Input placeholder="Comment" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            label="IP Address"
            name="ip">
            <Input placeholder="127.0.0.1" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className="flex justify-center mt-6">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={loader}
              disabled={
                inTimeDate.time === null ||
                inTimeDate.date === null ||
                outTimeDate.time === null ||
                outTimeDate.date === null
              }>
              Add Attendance
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Card
        title={<span className="text-center font-bold">Import From CSV</span>}
        className="mt-5">
        <UploadMany
          title={"Demo Attendance"}
          demoData={[
            ["username", "inTime", "outTime"],
            ["admin", "27-10-2024 4:38 AM", "27-10-2024 5:39 AM"],
          ]}
          urlPath={"attendance"}
          loadAllThunk={loadAllAttendancePaginated}
          query={{ status: true, page: 1, count: 10 }}
        />
      </Card>
    </>
  );
}

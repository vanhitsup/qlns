import Card from "@/UI/Card";
import List from "@/UI/List";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import { loadSingleLeave } from "@/redux/rtk/features/hrm/leave/leaveSlice";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReviewApplication from "./ReviewApplication";
import Loader from "@/components/Loader/Loader";

export default function DetailsLeave() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { leave, loading } = useSelector((state) => state.leave);

  useEffect(() => {
    dispatch(loadSingleLeave(id));
  }, [dispatch, id]);
  return (
    <>
      {leave ? (
        <div className="flex gap-2 md:gap-4">
          <Card
            className={"w-2/3"}
            title={<h1 className="font-semibold">Leave Application</h1>}
            extra={
              <CreateDrawer
                permission={"create-leaveApplication"}
                title={"Review Leave"}
                width={35}
                icon={false}
              >
                <ReviewApplication data={leave} />
              </CreateDrawer>
            }
          >
            <List
              labelClassName="w-[40%]"
              list={[
                {
                  label: "Application By",
                  value: (
                    <Link
                      className="hover:text-primary duration-200"
                      to={`/admin/staffs/${leave?.user?.id}`}
                    >
                      {leave?.user?.username}
                    </Link>
                  ),
                },
                {
                  label: "Leave Type",
                  value: leave?.leaveType,
                },
                {
                  label: "Leave Duration",
                  value: `${leave?.leaveDuration} ${leave?.leaveDuration > 1 ? "days" : "day"}`,
                },
                {
                  label: "Leave From",
                  value: dayjs(leave?.leaveFrom).format("DD/MM/YYYY"),
                },
                {
                  label: "Leave To",
                  value: dayjs(leave?.leaveTo).format("DD/MM/YYYY"),
                },

                {
                  label: "Reason",
                  value: leave?.reason,
                },
              ]}
            />
          </Card>
          <Card
            className={"w-1/3"}
            title={
              <h1 className="font-semibold">
                Application Status: {leave?.status}
              </h1>
            }
          >
            <List
              labelClassName="w-[40%]"
              list={[
                {
                  label: "Accepted By",
                  value: `${leave?.acceptLeaveBy ? `${leave?.acceptLeaveBy?.firstName} ${leave?.acceptLeaveBy?.lastName}` : "N/A"}`,
                },
                {
                  label: "Leave Type",
                  value: leave?.leaveType,
                },
                {
                  label: "Leave Duration",
                  value: `${leave?.acceptedLeaveDuration || 0} ${leave?.acceptedLeaveDuration > 1 ? "days" : "day"}`,
                },
                {
                  label: "Leave From",
                  value: `${leave?.acceptLeaveFrom ? dayjs(leave?.acceptLeaveFrom).format("DD/MM/YYYY") : "N/A"}`,
                },
                {
                  label: "Leave To",
                  value: `${leave?.acceptLeaveTo ? dayjs(leave?.acceptLeaveTo).format("DD/MM/YYYY") : "N/A"}`,
                },

                {
                  label: "Review Comment",
                  value: leave?.reviewComment ? leave?.reviewComment : "N/A",
                },
              ]}
            />
          </Card>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

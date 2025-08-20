import Card from "@/UI/Card";
import List from "@/UI/List";
import CreateDrawer from "@/components/CommonUi/CreateDrawer";
import Loader from "@/components/Loader/Loader";
import { loadSingleJobApplication } from "@/redux/rtk/features/hrm/jobApplication/jobApplicationSlice";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReviewApplication from "./ReviewApplication";

export default function DetailsApplication() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobApplication } = useSelector((state) => state.jobApplication);
  useEffect(() => {
    dispatch(loadSingleJobApplication(id));
  }, [dispatch, id]);
  return (
    <>
      {jobApplication ? (
        <Card
          title={`Job Application ${jobApplication.id}`}
          extra={
            <>
              <CreateDrawer
                permission={"readSingle-jobApplication"}
                title={"Applicant CV or Resume"}
                width={82}
                color={"bg-rose-500"}
                icon={false}>
                <div>
                  <embed
                    src={jobApplication.cvUrl}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                  />
                </div>
              </CreateDrawer>
              <CreateDrawer
                permission={"create-jobApplication"}
                title={"Review Application"}
                icon={false}
                width={35}>
                <ReviewApplication data={jobApplication} />
              </CreateDrawer>
            </>
          }>
          <div className="max-w-[800px] mx-auto">
            <List
              list={[
                {
                  label: "Candidate Name",
                  value: jobApplication?.name,
                },
                {
                  label: "Applied For",
                  value: jobApplication?.job.jobTitle,
                },
                {
                  label: "Applied Date",
                  value: dayjs(jobApplication?.job.createdAt).format(
                    "DD/MM/YYYY"
                  ),
                },
                {
                  label: "Email",
                  value: jobApplication?.email,
                },
                {
                  label: "Phone",
                  value: jobApplication?.phone,
                },
                {
                  label: "Cover Letter",
                  value: jobApplication?.coverLater,
                },
                {
                  label: "Application Status",
                  value: jobApplication?.jobApplicationStatus.applicationStatus,
                },
              ]}
            />
          </div>
        </Card>
      ) : (
        <Loader />
      )}
    </>
  );
}

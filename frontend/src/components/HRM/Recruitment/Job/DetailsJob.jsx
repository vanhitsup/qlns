import Card from "@/UI/Card";
import List from "@/UI/List";
import Menu from "@/UI/Menu";
import Loader from "@/components/Loader/Loader";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { loadSingleJob } from "@/redux/rtk/features/hrm/job/jobSlice";
import { EditOutlined } from "@ant-design/icons";
import { Popover, Tag } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function DetailsJob() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { job, loading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(loadSingleJob(id));
  }, [dispatch, id]);

  return (
    <div>
      {job ? (
        <div>
          <Card
            title={"Job Information"}
            extra={
              <Popover
                className="mr-1"
                content={
                  <Menu
                    items={[
                      {
                        label: (
                          <UserPrivateComponent permission={"update-job"}>
                            <Link
                              to={`/admin/job/${id}/update`}
                              className="flex items-center gap-2 cursor-pointer">
                              <EditOutlined className=" rounded-md" />
                              Edit
                            </Link>
                          </UserPrivateComponent>
                        ),
                        key: "edit",
                      },
                    ]}
                  />
                }
                placement="bottomRight"
                arrow={false}
                trigger="click">
                <BsThreeDotsVertical className="cursor-pointer text-base" />
              </Popover>
            }>
            <div className="flex gap-5 md:gap-10">
              <List
                className="w-full"
                labelClassName="w-[40%]"
                list={[
                  {
                    label: "Company",
                    value: job.company.companyName,
                  },
                  {
                    label: "Job Title",
                    value: job.jobTitle,
                  },
                  {
                    label: "Job Category",
                    value: job.jobCategory.jobCategoryName,
                  },
                  {
                    label: "Job Location",
                    value: `${job.jobLocation.jobLocation}, ${job.jobLocation.countryName}`,
                  },
                  {
                    label: "Job Skills",
                    value: job.jobSkills.map((skills) => (
                      <Tag key={skills.id} color={"blue"}>
                        {skills.jobSkills.jobSkillName}
                      </Tag>
                    )),
                  },
                  {
                    label: "Total Vacancy",
                    value: job.totalPosition,
                  },
                ]}
              />
              <List
                className="w-full"
                labelClassName="w-[40%]"
                list={[
                  {
                    label: "Start Time",
                    value: dayjs(job.startTime).format("DD/MM/YYYY"),
                  },
                  {
                    label: "End Time",
                    value: dayjs(job.endTime).format("DD/MM/YYYY"),
                  },
                  {
                    label: "Job Type",
                    value: job.jobType.jobTypeName,
                  },
                  {
                    label: "Experience Need",
                    value: job.jobWorkExperience.workExperience,
                  },
                  {
                    label: "Salary",
                    value:
                      job.jobPaySystem === "exactSalary"
                        ? job.exactSalary
                        : `${job.startingSalary} - ${job.maximumSalary}`,
                  },
                  {
                    label: "Pay By",
                    value: job.jobPayBy,
                  },
                ]}
              />
            </div>
          </Card>
          <div className="flex gap-5 my-5">
            <Card title={"Job Requirements"} className={"w-full"}>
              <p
                dangerouslySetInnerHTML={{
                  __html: job.jobRequirement,
                }}></p>
            </Card>
            <Card title={"Job Description"} className={"w-full"}>
              <p
                dangerouslySetInnerHTML={{
                  __html: job.jobDescription,
                }}></p>
            </Card>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

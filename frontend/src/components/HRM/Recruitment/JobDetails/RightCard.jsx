import { Button } from "antd/lib";
import React from "react";
import { Link } from "react-router-dom";

const RightCard = ({ data }) => {
    return (
        <div className="bg-white rounded-sm text-justify">
            <div>
                <div className="p-6 mt-4">
                    <h1 className="font-bold uppercase">Company</h1>
                    <p className="text-zinc-600">{data?.company.companyName}</p>
                </div>
                <hr className="border-zinc-50 border-[2px]" />
            </div>
            <div>
                <div className="p-6 mt-4">
                    <h1 className="font-bold uppercase">Job Locations</h1>
                    <p className="text-zinc-600">
                        {data?.jobLocation?.jobLocation}
                        {", "}
                        {data?.jobLocation?.countryName}
                    </p>
                </div>
                <hr className="border-zinc-50 border-[2px]" />
            </div>
            <div>
                <div className="p-6 mt-4">
                    <h1 className="font-bold uppercase">Job Category</h1>
                    <p className="text-zinc-600">
                        {data?.jobCategory?.jobCategoryName}
                    </p>
                </div>
                <hr className="border-zinc-50 border-[2px]" />
            </div>
            <div>
                <div className="p-6 mt-4">
                    <h1 className="font-bold uppercase">Skills</h1>
                    <p className="text-zinc-600">
                        {" "}
                        <div className="grid grid-cols-2 gap-4 w-full">
                            {data?.jobSkills.map((skill, index) => (
                                <p
                                    key={index}
                                    className="text-zinc-700 w-auto bg-green-100 font-bold px-2 rounded"
                                >
                                    {skill?.jobSkills?.jobSkillName}
                                </p>
                            ))}
                        </div>
                    </p>
                </div>
                <hr className="border-zinc-50 border-[2px]" />
            </div>

            <div>
                <div className="p-6 mt-4">
                    <h1 className="font-bold uppercase">
                        Required Experiences
                    </h1>
                    <p className="text-zinc-600">
                        {data?.jobWorkExperience?.workExperience}
                    </p>
                </div>
                <hr className="border-zinc-50 border-[2px]" />
            </div>
            <div>
                <div className="p-6 mt-4">
                    <h1 className="font-bold uppercase">Total Positions</h1>
                    <p className="text-zinc-600">{data?.totalPosition}</p>
                </div>
                <hr className="border-zinc-50 border-[2px]" />
            </div>
            <div>
                <div className="p-6 mt-4">
                    {data?.jobPaySystem === "rangeSalary" ? (
                        <>
                            <h1 className="font-bold uppercase">
                                Salary Range
                            </h1>
                            <p className="text-zinc-600">
                                {data?.startingSalary}- {data?.maximumSalary}{" "}
                                <span className="text-red-500 block text-sm">
                                    (Depends on Experience and expertise)
                                </span>
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="font-bold uppercase">Salary</h1>
                            <p className="text-zinc-600">{data?.exactSalary}</p>
                        </>
                    )}
                </div>
                <hr className="border-zinc-50 border-[2px]" />
            </div>

            <div>
                <div className="p-6 mt-4 mb-4">
                    <div className="text-center">
                        <Link to={`/recruitment/apply/${data?.id}`}>
                            {" "}
                            <Button
                                type="default"
                                size="large"
                                className="bg-green-700 text-white font-bold border-none hover:bg-green-600"
                            >
                                Apply Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightCard;
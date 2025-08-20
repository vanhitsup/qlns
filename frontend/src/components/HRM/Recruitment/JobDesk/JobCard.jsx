import { CompassOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const JobCard = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div>
            <div
                className={`w-full min-h-[200px] p-4 rounded ${
                    isHovered
                        ? "shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                        : "shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                } flex flex-col justify-between bg-white`}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            >
                <div className="mb-4 text-zinc-700">
                    <h2 className="text-xl">
                        {data?.jobTitle || "No Title Found"}
                    </h2>
                    <p className="text-zinc-600">
                        By {data?.company?.companyName || "Undefined"}
                    </p>
                </div>
                <div className="flex justify-between gap-12">
                    <p className="flex justify-center items-center gap-1">
                        <CompassOutlined />
                        {data?.jobLocation?.jobLocation},{" "}
                        {data?.jobLocation?.countryName}
                    </p>
                    <p className="flex justify-center items-center gap-1">
                        <MenuOutlined />
                        {data?.jobCategory?.jobCategoryName}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
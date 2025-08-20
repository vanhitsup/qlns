import { Header } from "antd/es/layout/layout";
import React from "react";
import bannerImage from "../../../../assets/images/recruitmentBanner.jpg"
import RecruitmentHeader from "./RecruitmentHeader";

const RecruitmentCommonBanner = ({ title }) => {
    return (
        <>
            <div
                className="relative bg-blend-overlay h-[200px] bg-fit bg-no-repeat"
                style={{ backgroundImage: `url(${bannerImage})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <Header>
                    <RecruitmentHeader />
                </Header>
                <div className="text-white font-bold text-2xl absolute top-2/4 w-full text-center uppercase">
                    {title}
                </div>
            </div>
        </>
    );
};

export default RecruitmentCommonBanner;
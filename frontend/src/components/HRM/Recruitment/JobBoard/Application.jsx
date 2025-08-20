import React from "react";
// eslint-disable-next-line import/no-unresolved
// import "./styles.css";

const Application = ({ application: application }) => {
    return (
        <div className="bg-white shadow w-full rounded-lg" draggable="true">
            <div className=" bg-violet-400 mt-3 py-1">
                <span className="px-3 font-semibold text-white">
                    {application.job.jobTitle}
                </span>
            </div>
           <div className="px-3 py-3">
           <p className=" txt-color font-medium">
                {" "}
                Application No: {application.id}
            </p>
            <p className=" txt-color font-medium">
                {" "}
                Name: {application.name}
            </p>
            <p className=" txt-color font-medium">
                {" "}
                Email: {application.email}
            </p>
           </div>
        </div>
    );
};

export default Application;
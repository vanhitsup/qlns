import React from "react";

const JobTitle = ({ title }) => {
    return (
        <div className="text-zinc-600 text-center mx-auto text-3xl font-bold w-1/3 my-12">
            <div className="my-2 w-2/3 mx-auto">
                <hr className="border-zinc-200" />
                <hr className="border-zinc-200" />
                <hr className="border-zinc-200" />
            </div>
            <h2 className="">{title}</h2>
            <div className="my-2 w-2/3 mx-auto">
                <hr className="border-zinc-200" />
                <hr className="border-zinc-200" />
                <hr className="border-zinc-200" />
            </div>
        </div>
    );
};

export default JobTitle;
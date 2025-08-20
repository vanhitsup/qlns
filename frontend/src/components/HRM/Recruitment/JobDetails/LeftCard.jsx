import React from "react";

const LeftCard = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-sm text-justify">
            <h1 className="text-2xl font-bold mt-4">{data?.jobTitle}</h1>
            <div className="uppercase w-2/3">
                <h2 className="font-bold ml-1"> skills:</h2>{" "}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full">
                    {data?.jobSkills.map((skill, index) => (
                        <p
                            key={index}
                            className="text-zinc-700 w-auto bg-green-100 font-bold px-2 rounded"
                        >
                            {skill?.jobSkills?.jobSkillName}
                        </p>
                    ))}
                </div>
            </div>

            <div className="mt-12">
                <h1 className="uppercase text-xl font-semibold mb-2">
                    job description
                </h1>
                <div>
                    {" "}
                    <p
                        dangerouslySetInnerHTML={{
                            __html: data?.jobRequirement,
                        }}
                    ></p>
                </div>
            </div>

            <div className="mt-12">
                <h1 className="uppercase text-xl font-semibold mb-2">
                    job Requirement
                </h1>
                <div>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: data?.jobDescription,
                        }}
                    ></p>
                </div>
            </div>
        </div>
    );
};

export default LeftCard;
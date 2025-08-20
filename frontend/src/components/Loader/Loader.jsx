import { Spin } from "antd";
import React from "react";
import { cn } from "@/utils/functions";

function Loader({ className }) {
  return (
    <div
      className={cn("h-screen flex justify-center items-center", {
        [className]: className,
      })}
    >
      <div className=" flex flex-col justify-center">
        <Spin size="large" />
        <h5 className="pt-2"> Loading Please Wait ...</h5>
      </div>
    </div>
  );
}

export default Loader;

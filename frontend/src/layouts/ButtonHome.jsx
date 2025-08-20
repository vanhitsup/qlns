import Button from "@/UI/Button";
import { useState } from "react";
import { FaInstagramSquare, FaLinkedin, FaYoutubeSquare } from "react-icons/fa";
import { FaSquareFacebook, FaXTwitter } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ButtonHome() {
  const [logoError, setLogoError] = useState(false);
  const { data } = useSelector((state) => state.setting);
  let logoRender = null;
  if (data?.logo && !logoError) {
    logoRender = (
      <img
        onError={() => setLogoError(true)}
        loading="lazy"
        className="rounded w-[200px] object-contain ml-4 mb-4"
        src={data?.logo}
      />
    );
  } else {
    logoRender = (
      <div>
        <h2
          className="text-black text-center ml-4 flex items-center justify-center gap-2"
          style={{ fontSize: "25px" }}>
          <strong>OS</strong>
          <strong style={{ color: "red	", fontWeight: "bold" }}>ERP</strong>
        </h2>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col md:flex-row fixed w-full bg-white">
      <div className="w-full md:w-1/2 h-full radial-gradient-top-left bg-black">
        <div className="bgImageForLogin h-[calc(100%-80px)] flex justify-center items-center">
          <div className="text-white text-center font-Popins px-4 home-header-animation">
            <h1 className="text-3xl md:text-4xl font-bold   ">
              Welcome to OS ERP
            </h1>
            <p className="text-sm md:text-xl font-normal text-gray-300">
              All in one ERP, HRM, CRM Solution
            </p>
            <div className="inline-block md:hidden mt-16">
              <Link to="/admin/auth/login">
                <Button
                  color="primary"
                  className="text-sm font-semibold bg-[#473afe] text-gray-900 hover:bg-[#aaf334] hover:text-black rounded-xl border-[#a7ee35] border-2">
                  Admin Login
                </Button>
              </Link>
              <Link to="/login" color="primary">
                <Button
                  color="primary"
                  className="text-sm font-semibold bg-[#B4FE3A] text-gray-900 hover:bg-[#aaf334] border-[#a7ee35] border-2 hover:text-black rounded-xl mt-4">
                  Customer Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="text-white text-center mb-4">
            <span className="border-b border-gray-600  pb-2 px-10">
              All rights reserved &copy; Omega Solution LLC
            </span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link
              to={"https://www.linkedin.com/company/oneomegasolution"}
              https:target="_blank">
              <FaLinkedin className="text-white" size={20} />
            </Link>
            <Link
              to={"https://www.facebook.com/omegasolutionllc"}
              target="_blank">
              <FaSquareFacebook className="text-white" size={20} />
            </Link>
            <Link
              to={"https://www.instagram.com/omegasolutionllc"}
              target="_blank">
              <FaInstagramSquare className="text-white" size={20} />
            </Link>

            <Link
              to={"https://www.youtube.com/@omegasolutionllc"}
              target="_blank">
              <FaYoutubeSquare className="text-white" size={20} />
            </Link>
            <Link
              to={"https://www.twitter.com/omegasolution1"}
              target="_blank"
              className="">
              <FaXTwitter
                className="text-black bg-white p-[2px] rounded"
                size={18}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-full hidden md:flex items-center justify-center bg-[#F7F7F8]">
        <div className="flex flex-col gap-4">
          {logoRender}
          <span className="text-base font-semibold border-b pb-4 px-4">
            Achieve more, stress less.
            <div className="font-light text-sm mt-2">
              Gain 45% growth by using our software.
              <br />
              Relax and manage your business from anywhere in the world.
            </div>
          </span>
          <div className="flex gap-4 ml-4">
            <Link to="/admin/auth/login">
              <Button
                color="primary"
                className="text-sm font-semibold bg-[#B4FE3A] text-gray-900 hover:bg-[#aaf334] hover:text-black rounded-xl border-[#a7ee35] border-2">
                Admin Login
              </Button>
            </Link>
            <Link to="/login" color="primary">
              <Button
                color="primary"
                className="text-sm font-semibold bg-[#B4FE3A] text-gray-900 hover:bg-[#aaf334] border-[#a7ee35] border-2 hover:text-black rounded-xl">
                Customer Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

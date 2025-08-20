import Button from "@/UI/Button";
import { Link } from "react-router-dom";
import useSettings from "@/Hooks/useSettings";

export default function ButtonHome() {
  const data = useSettings() || {};

  const logoRender = (
    <div>
      <h2
        className="text-black text-center ml-4 flex items-center justify-center gap-2"
        style={{ fontSize: "25px" }}>
        <strong>{data?.companyName || "Company Name"}</strong>
      </h2>
    </div>
  );

  return (
    <div className="h-screen fixed w-full bg-white">
      <div className="w-full h-full radial-gradient-top-left bg-black">
        <div className="bgImageForLogin h-[calc(100%-80px)] flex justify-center items-center">
          <div className="text-white flex flex-col items-center font-Popins px-4 home-header-animation">
            <h1 className="text-3xl md:text-4xl font-bold   ">
              Welcome to {data?.companyName || "Company Name"}
            </h1>
            <p className="text-sm md:text-xl font-normal text-gray-300">
              {data.tagLine || "Tag Line"}
            </p>

            <Link to="/admin/auth/login" className="w-[200px] mt-5">
              <Button
                color="primary"
                className="w-full text-sm font-semibold bg-[#B4FE3A] text-gray-900 hover:bg-[#aaf334] hover:text-black rounded-xl border-[#a7ee35] border-2">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

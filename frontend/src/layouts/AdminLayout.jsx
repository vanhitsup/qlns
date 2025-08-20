import Header from "@/layouts/Header";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { loadPermissionById } from "../redux/rtk/features/auth/authSlice";
import { cn } from "../utils/functions";
import Footer from "./Footer";
import SideNav from "./SideNav/SideNav";
const roleId = localStorage.getItem("roleId");
const mode = import.meta.env.VITE_APP_VERSION;

function AdminLayout() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imageError, setImageError] = useState();
  const { data, loading } = useSelector((state) => state?.setting) || {};
  const {
    list: permissions,
    loading: permissionLoad,
    error,
  } = useSelector((state) => state.auth) || {};

  const handleCollapsed = (val) => {
    setCollapsed(val);
  };

  const openDrawer = () => setVisible(!visible);

  useEffect(() => {
    if (!permissions && !permissionLoad && !error) {
      dispatch(loadPermissionById(roleId));
    }
  }, [dispatch, error, permissionLoad, permissions]);

  return (
    <main
      className={cn("relative  w-full h-screen overflow-hidden flex flex-row", {
        "h-[calc(100vh-32px)] mt-8": mode === "demo",
      })}>
      <div
        className={`hidden md:flex dark:bg-transparent bg-[#2A2D3E] dark:border-gray-50 border-primary hover:bg-primary  border-2 text-white absolute top-[10px] left-[225px] w-[30px] h-[30px] leading-[30px] rounded-full justify-center items-center z-30 duration-300  ${
          !collapsed
            ? "top-[10px] md:left-[185px] 2xl:left-[225px]"
            : "top-[10px] left-[70px]"
        }`}>
        {collapsed ? (
          <RightOutlined
            onClick={() => handleCollapsed(!collapsed)}
            className="text-[16px] cursor-pointer"
          />
        ) : (
          <LeftOutlined
            onClick={() => handleCollapsed(!collapsed)}
            className="text-[16px] cursor-pointer"
          />
        )}
      </div>
      {/* for small device */}
      <Drawer
        title={false}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        width={240}>
        <div className="pt-[16px] min-h-screen overflow-auto no-scrollbar w-[240px] bg-sideNavBg  text-white select-none">
          <SideNav />
        </div>
      </Drawer>

      {/* // for large device */}
      <div
        className={cn(
          " hidden md:block left-0 top-0 z-10  duration-300 h-screen  w-[200px] 2xl:w-[240px] bg-sideNavBg  text-white select-none",
          { "w-[86px] 2xl:w-[86px]": collapsed }
        )}>
        {data && !loading && (
          <Link
            to={"/admin"}
            className={`w-[180px] h-[70px] mx-auto flex items-center justify-center my-3 cursor-pointer ${
              !collapsed ? "visible" : "invisible"
            }`}>
            {data?.logo && !imageError ? (
              <img
                className="text-white text-center"
                alt="logo"
                src={data.logo}
                style={{ width: "180PX", height: "70px" }}
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className={`w-[180px] h-[70px] mx-auto flex items-center justify-center my-3 cursor-pointer ${
                  !collapsed ? "visible" : "invisible"
                }`}>
                {data?.logo && !imageError ? (
                  <img
                    className="text-white text-center"
                    alt="logo"
                    src={data.logo}
                    style={{ width: "180PX", height: "70px" }}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <h2 className="text-white text-center flex items-center justify-center gap-2 text-[25px]">
                    {data?.companyName?.includes(" ") ? (
                      <>
                        <strong
                          style={{ color: "#6eccaf", fontWeight: "bold" }}>
                          {data?.companyName?.split(" ")[0]}
                        </strong>
                        {data?.companyName?.slice(
                          data?.companyName?.indexOf(" ") + 1
                        )}
                      </>
                    ) : (
                      <strong style={{ color: "#55F", fontWeight: "bold" }}>
                        {data?.companyName}
                      </strong>
                    )}
                  </h2>
                )}
              </div>
            )}
          </Link>
        )}
        {loading && (
          <div
            className={`w-[180px] h-[70px] mx-auto flex flex-col gap-1 my-3 ${
              !collapsed ? "visible" : "invisible"
            }`}>
            <h1 className="bg-slate-50 opacity-10 h-4 rounded  w-full  animate-pulse"></h1>
            <h1 className="bg-slate-50 opacity-10 h-4 rounded w-full  animate-pulse"></h1>
            <h1 className="bg-slate-50 opacity-10 h-4 rounded  w-full animate-pulse"></h1>
          </div>
        )}

        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div
        className={cn(
          `flex flex-col w-full 2xl:w-[calc(100vw-240px)] md:w-[calc(100vw-200px)] duration-300`,
          {
            "md:w-[calc(100vw-86px)] 2xl:w-[calc(100vw-86px)]": collapsed,
          }
        )}>
        <Header onPress={openDrawer} data={data} loading={loading} />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default AdminLayout;

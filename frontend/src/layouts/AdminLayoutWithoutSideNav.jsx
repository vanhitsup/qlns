import Header from "@/layouts/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { loadPermissionById } from "../redux/rtk/features/auth/authSlice";
import { cn } from "../utils/functions";

export default function AdminLayoutWithoutSideNav() {
  const { data, loading } = useSelector((state) => state?.setting) || {};
  const dispatch = useDispatch();
  const roleId = localStorage.getItem("roleId");
  const {
    list: permissions,
    loading: permissionLoad,
    error,
  } = useSelector((state) => state.auth) || {};

  const [imageError, setImageError] = useState();

  useEffect(() => {
    if (!permissions && !permissionLoad && !error) {
      dispatch(loadPermissionById(roleId));
    }
  }, [dispatch, error, permissionLoad, permissions, roleId]);
  const mode = import.meta.env.VITE_APP_VERSION;
  useEffect(() => {
    setImageError(false);
  }, [data]);

  return (
    <main
      className={cn("relative  w-full h-screen overflow-hidden flex flex-row", {
        "h-[calc(100vh-32px)] mt-8": mode === "demo",
      })}
    >
      <div className={cn(`flex flex-col w-full duration-300`)}>
        <Header isSideNavNan={true} data={data} loading={loading} />
        <div className='flex-1 min-h-0 overflow-auto'>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

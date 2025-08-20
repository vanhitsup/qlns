import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/styles/main.css";

import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import LoaderSpinner from "./components/Loader/LoaderSpinner";
import ServerError from "./components/StaticPages/ServerError";
import Login from "./components/User/Login";
import AdminLayout from "./layouts/AdminLayout";
import useAdminRoutes from "./layouts/AdminRoutes";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerRoutes from "./layouts/CustomerRoutes";
import DemoExpiredUi from "./layouts/DemoExpiredUi";
import TopHeadMessage from "./layouts/TopHeadMessage";
import { getSetting } from "./redux/rtk/features/setting/settingSlice";
import useDemo from "./utils/useDemo";


function App() {
  const { data, loading, error } = useSelector((state) => state?.setting) || {};
  const dispatch = useDispatch();
  const { demo, data: isDemoPass, loading: DemoLoading } = useDemo();
  const adminRoute = useAdminRoutes();

  useEffect(() => {
    if (!data && !loading && !error && !demo) {
      dispatch(getSetting());
    } else if (!data && !loading && !error && demo && isDemoPass) {
      dispatch(getSetting());
    }
  }, [data, demo, dispatch, error, isDemoPass, loading]);

  // content render
  let content = null;
  if (loading || DemoLoading) content = <LoaderSpinner />;
  else if (demo && !isDemoPass) content = <DemoExpiredUi />;
  else if (
    (!demo && data && !loading) ||
    (demo && isDemoPass && !DemoLoading && data && !loading)
  ) {
    content = (
      <Routes>
        <Route path="/" element={<CustomerLayout />} key={"index"}>
          {CustomerRoutes}
        </Route>
        <Route path="/admin" element={<AdminLayout />} key={"Admin"}>
          {adminRoute}
        </Route>

        <Route path="/admin/auth/login" exact element={<Login />} key="login" />
      </Routes>
    );
  } else if (error) {
    content = <ServerError />;
  }
  const mode = import.meta.env.VITE_APP_VERSION;
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      {mode === "demo" && <TopHeadMessage />}
      {content}
    </BrowserRouter>
  );
}

export default App;

import Dashboard from "@/components/HRM/Dashboard/Dashboard";
import Loader from "@/components/Loader/Loader";
import Logout from "@/components/User/Logout";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const GetAllMedia = lazy(() => import("@/components/Media/GetAllMedia"));

const GetAllDeliveryBoy = lazy(() =>
  import("@/components/DeliveryBoy/GetAllDeliveryBoy")
);

const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllCurrency = lazy(() =>
  import("@/components/eComErp/Currency/GetAllCurrency")
);
const GetAllDeliveryFee = lazy(() =>
  import("@/components/eComErp/DeliveryFee/GetAllDeliveryFee")
);

const GetAllSlider = lazy(() =>
  import("@/components/eComErp/Slider/GetAllSlider")
);

const GetAllPriority = lazy(() =>
  import("@/components/Priority/GetAllPriority")
);
const GetAllTask = lazy(() => import("@/components/Task/GetAllTask"));

const CommonRoutes = [
  <Route
    path="slider"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-sliderImages"}>
          <GetAllSlider />
        </PermissionChecker>
      </Suspense>
    }
    key="slider"
  />,

  <Route
    path="delivery-boy"
    element={
      <Suspense fallback={<Loader />}>
        <GetAllDeliveryBoy />
      </Suspense>
    }
    key="delivery-boy"
  />,
  <Route
    path="delivery-fee"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-deliveryFee"}>
          <GetAllDeliveryFee />
        </PermissionChecker>
      </Suspense>
    }
    key="delivery-fee"
  />,

  <Route
    path="currency"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-currency"}>
          <GetAllCurrency />
        </PermissionChecker>
      </Suspense>
    }
    key="currency"
  />,

  <Route path="auth/logout" exact element={<Logout />} key={"logout"} />,
  <Route
    path="dashboard"
    element={
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    }
    key="dashboard"></Route>,
  <Route
    index
    element={
      <Suspense fallback={<Loader />}>
        <Dashboard />
      </Suspense>
    }
    key="ho"
  />,
  <Route
    path="media"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-media"}>
          <GetAllMedia />
        </PermissionChecker>
      </Suspense>
    }
    key="media"
  />,

  <Route
    path="priority"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-priority"}>
          <GetAllPriority />
        </PermissionChecker>
      </Suspense>
    }
    key="priority"
  />,
  <Route
    path="task"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-task"}>
          <GetAllTask />
        </PermissionChecker>
      </Suspense>
    }
    key="task global"
  />,
];
export default CommonRoutes;

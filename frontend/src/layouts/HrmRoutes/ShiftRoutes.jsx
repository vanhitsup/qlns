import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const DetailsShift = lazy(() => import("@/components/HRM/Shift/DetailsShift"));
const GetAllShift = lazy(() => import("@/components/HRM/Shift/GetAllShift"));

const ShiftRoutes = [
  <Route
    path='shift'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-shift"}>
          <GetAllShift />
        </PermissionChecker>
      </Suspense>
    }
    key='shift'
  />,
  <Route
    path='shift/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-shift"}>
          <DetailsShift />
        </PermissionChecker>
      </Suspense>
    }
    key='shift-details'
  />,
];

export default ShiftRoutes;

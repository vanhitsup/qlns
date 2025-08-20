import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllLeave = lazy(() => import("@/components/HRM/Leave/GetAllLeave"));
const DetailsLeave = lazy(() => import("@/components/HRM/Leave/DetailsLeave"));

const LeaveRoutes = [
  <Route
    path='leave'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-leaveApplication"}>
          <GetAllLeave />
        </PermissionChecker>
      </Suspense>
    }
    key='leave'
  />,
  <Route
    path='leave/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-leaveApplication"}>
          <DetailsLeave />
        </PermissionChecker>
      </Suspense>
    }
    key='leave'
  />,
];

export default LeaveRoutes;

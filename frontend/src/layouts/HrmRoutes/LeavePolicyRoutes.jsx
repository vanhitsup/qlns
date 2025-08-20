import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllLeavePolicy = lazy(() => import("@/components/HRM/LeavePolicy/GetAllLeavePolicy"));
const DetailsLeavePolicy = lazy(() => import("@/components/HRM/LeavePolicy/DetailsLeavePolicy"));

const LeavePolicyRoutes = [
  <Route
    path='leave-policy'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-leavePolicy"}>
          <GetAllLeavePolicy/>
        </PermissionChecker>
      </Suspense>
    }
    key='leave-policy'
  />,
  <Route
    path='leave-policy/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-leavePolicy"}>
          <DetailsLeavePolicy/>
        </PermissionChecker>
      </Suspense>
    }
    key='leave-policy'
  />,
];

export default LeavePolicyRoutes;

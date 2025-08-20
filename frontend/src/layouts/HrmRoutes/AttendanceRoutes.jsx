import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";

const GetAllAttendance = lazy(
  () => import("@/components/HRM/Attendance/GetAllAttendance"),
);

const AttendanceRoutes = [
  <Route
    path="attendance"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-attendance"}>
          <GetAllAttendance />
        </PermissionChecker>
      </Suspense>
    }
    key="attendance"
  />,
];

export default AttendanceRoutes;

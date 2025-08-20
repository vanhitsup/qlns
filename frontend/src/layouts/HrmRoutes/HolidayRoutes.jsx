import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
const GetAllPublicHoliday = lazy(() => import("@/components/HRM/PublicHoliday/GetAllPublicHoiday"));
const GetAllWeeklyHoliday = lazy(() => import("@/components/HRM/WeeklyHoliday/GetAllWeeklyHoliday"));


const HolidayRoutes = [
  <Route
    path='weekly-holiday'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-attendance"}>
          <GetAllWeeklyHoliday/>
        </PermissionChecker>
      </Suspense>
    }
    key='weekly-holiday'
  />,
  <Route
    path='public-holiday'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-attendance"}>
          <GetAllPublicHoliday/>
        </PermissionChecker>
      </Suspense>
    }
    key='public-holiday'
  />,
];

export default HolidayRoutes;

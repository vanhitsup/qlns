import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const DetailsEmploymentStatus = lazy(() =>
  import("@/components/HRM/EmploymentStatus/DetailsEmploymentStatus")
);
const GetEmploymentStatus = lazy(() =>
  import("@/components/HRM/EmploymentStatus/GetEmploymentStatus")
);

const EmploymentRoutes = [
  <Route
    path='employment-status'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-employmentStatus"}>
          <GetEmploymentStatus />
        </PermissionChecker>
      </Suspense>
    }
    key='employment-status'
  />,
  <Route
    path='employment-status/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-employmentStatus"}>
          <DetailsEmploymentStatus />
        </PermissionChecker>
      </Suspense>
    }
    key='employment-status-details'
  />,
];

export default EmploymentRoutes;

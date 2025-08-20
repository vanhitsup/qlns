import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const DetailsDepartment = lazy(() =>
  import("@/components/HRM/Department/DetailsDepartment")
);
const GetAllDepartment = lazy(() =>
  import("@/components/HRM/Department/GetAllDepartment")
);
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);

const DepartmentRoutes = [
  <Route
    path="department"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-department"}>
          <GetAllDepartment />
        </PermissionChecker>
      </Suspense>
    }
    key="department"
  />,
  <Route
    path="department/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker
          permission={["readSingle-department", "readAll-department"]}
        >
          <DetailsDepartment />
        </PermissionChecker>
      </Suspense>
    }
    key="department-details"
  />,
];
export default DepartmentRoutes;

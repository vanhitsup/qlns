import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllDesignation = lazy(() =>
  import("@/components/HRM/Designation/GetAllDesignation")
);
const DetailDesignation = lazy(() =>
  import("@/components/HRM/Designation/DetailDesignation")
);
const UpdateDesignation = lazy(() =>
  import("@/components/HRM/Designation/UpdateDesignation")
);

const DesignationRoutes = [
  <Route
    path='designation'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-designation"}>
          <GetAllDesignation />
        </PermissionChecker>
      </Suspense>
    }
    key='designation'
  />,
  <Route
    path='designation/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-designation"}>
          <DetailDesignation />
        </PermissionChecker>
      </Suspense>
    }
    key='designation-details'
  />,
  <Route
    path='designation/:id/update'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-designation"}>
          <UpdateDesignation />
        </PermissionChecker>
      </Suspense>
    }
    key='designation-update'
  />,
];
export default DesignationRoutes;

import Loader from "@/components/Loader/Loader";
import AddStaff from "@/components/User/AddStaff";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllStaff = lazy(() => import("@/components/User/GetAllStaff"));
const DetailStaff = lazy(() => import("@/components/User/DetailsStaff"));
const UpdateStaff = lazy(() => import("@/components/User/UpdateStaff"));

const UserRoutes = [
  <Route
    path="staff"
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-user"}>
          <GetAllStaff />
        </PermissionChecker>
      </Suspense>
    }
    key="staff"
  />,
  <Route
    path="add-staff"
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-user"}>
          <AddStaff />
        </PermissionChecker>
      </Suspense>
    }
    key="staff"
  />,
  <Route
    path="staff/:id"
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-user"}>
          <DetailStaff />
        </PermissionChecker>
      </Suspense>
    }
    key="staff-details"
  />,
  <Route
    path="staff/:id/update"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-user"}>
          <UpdateStaff />
        </PermissionChecker>
      </Suspense>
    }
    key="staff-update"
  />,
];

export default UserRoutes;

import Loader from "@/components/Loader/Loader";
import AddStaff from "@/components/User/AddStaff";
import UpdateStaff from "@/components/User/UpdateStaff";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllStaff = lazy(() => import("@/components/User/GetAllStaff"));
const DetailStaff = lazy(() => import("@/components/User/DetailsStaff"));

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
    exact
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

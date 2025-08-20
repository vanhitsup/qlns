import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const AddPermission = lazy(() => import("@/components/HRM/Role/AddPermission"));
const DetailRole = lazy(() => import("@/components/HRM/Role/DetailsRole"));
const GetAllRole = lazy(() => import("@/components/HRM/Role/GetAllRole"));

const RoleRoutes = [
  <Route
    path='role'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-role"}>
          <GetAllRole />
        </PermissionChecker>
      </Suspense>
    }
    key='role'
  />,
  <Route
    path='role/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-role"}>
          <DetailRole />
        </PermissionChecker>
      </Suspense>
    }
    key='role-details'
  />,
  <Route
    path='role/permit/:id/'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-permission"}>
          <AddPermission />
        </PermissionChecker>
      </Suspense>
    }
    key='role-permit'
  />,
];

export default RoleRoutes;

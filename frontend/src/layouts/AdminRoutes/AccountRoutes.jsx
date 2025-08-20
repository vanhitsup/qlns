import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const DetailAccount = lazy(() => import("@/components/Account/DetailAccount"));
const GetAllAccount = lazy(() => import("@/components/Account/GetAllAccount"));

const AccountRoutes = [
  <Route
    path="account"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-account"}>
          <GetAllAccount />
        </PermissionChecker>
      </Suspense>
    }
    key="account"
  />,
  <Route
    path="account/:id"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-account"}>
          <DetailAccount />
        </PermissionChecker>
      </Suspense>
    }
    key="account-details"
  />,
];

export default AccountRoutes;

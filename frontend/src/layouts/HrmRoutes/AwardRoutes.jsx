import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
    import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllAward = lazy(() => import("@/components/HRM/Award/GetAllAward"));
const DetailsAward = lazy(()=> import("@/components/HRM/Award/DetailsAward"));

const AwardRoutes = [
  <Route
    path='award'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-award"}>
          <GetAllAward/>
        </PermissionChecker>
      </Suspense>
    }
    key='award'
  />,
  <Route
    path='award/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-award"}>
          <DetailsAward />
        </PermissionChecker>
      </Suspense>
    }
    key='award-details'
  />,
];

export default AwardRoutes;

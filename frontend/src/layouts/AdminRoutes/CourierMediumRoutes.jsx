import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const DetailsCourier = lazy(() =>
  import("@/components/eComErp/CourierMedium/DetailsCourier")
);
const GetAllCourier = lazy(() =>
  import("@/components/eComErp/CourierMedium/GetAllCourier")
);

const CourierMediumRoutes = [
  <Route
    path='courier-medium'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-courier"}>
          <GetAllCourier />
        </PermissionChecker>
      </Suspense>
    }
    key='courier-medium'
  />,
  <Route
    path='courier-medium/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-courier"}>
          <DetailsCourier />
        </PermissionChecker>
      </Suspense>
    }
    key='courier-medium-details'
  />,
];
export default CourierMediumRoutes;

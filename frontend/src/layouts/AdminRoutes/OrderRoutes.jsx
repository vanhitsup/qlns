import { Suspense, lazy } from "react";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const DetailsOrder = lazy(() =>
  import("@/components/eComErp/Order/DetailsOrder")
);
const GetAllOrder = lazy(() =>
  import("@/components/eComErp/Order/GetAllOrder")
);
const GetAllResendReturnOrder = lazy(() =>
  import("@/components/eComErp/ResenReturnOrder/GetAllResendReturnOrder")
);
const DetailsReturnOrder = lazy(() =>
  import("@/components/eComErp/ReturnOrder/DetailsReturnOrder")
);
const GetAllReturnOrder = lazy(() =>
  import("@/components/eComErp/ReturnOrder/GetAllReturnOrder")
);
const ReturnOrderReport = lazy(() =>
  import("@/components/eComErp/ReturnOrder/ReturnOrderReport")
);
const GetAllReview = lazy(() =>
  import("@/components/eComErp/Review/GetAllReview")
);

import Loader from "@/components/Loader/Loader";
import { Route } from "react-router-dom";

const OrderRoutes = [
  <Route
    path='order'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-cartOrder"}>
          <GetAllOrder />
        </PermissionChecker>
      </Suspense>
    }
    key='order'
  />,
  <Route
    path='return-order'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-returnCartOrder"}>
          <GetAllReturnOrder />
        </PermissionChecker>
      </Suspense>
    }
    key='return-order'
  />,
  <Route
    path='resend-return-order'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-cartOrder"}>
          <GetAllResendReturnOrder />
        </PermissionChecker>
      </Suspense>
    }
    key='resend-return-order'
  />,
  <Route
    path='review'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-review"}>
          <GetAllReview />
        </PermissionChecker>
      </Suspense>
    }
    key='review'
  />,
  <Route
    path='order/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-cartOrder"}>
          <DetailsOrder />
        </PermissionChecker>
      </Suspense>
    }
    key='order-details'
  />,
  <Route
    path='return-order/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-returnCartOrder"}>
          <DetailsReturnOrder />
        </PermissionChecker>
      </Suspense>
    }
    key='return-order-details'
  />,
  <Route
    path='return-order-report'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-cartOrder"}>
          <ReturnOrderReport />
        </PermissionChecker>
      </Suspense>
    }
    key='return-order-report'
  />,
];

export default OrderRoutes;

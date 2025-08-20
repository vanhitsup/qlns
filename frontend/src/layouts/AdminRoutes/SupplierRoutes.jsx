import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const DetailsSupplier = lazy(() =>
  import("@/components/Suppliers/DetailsSupplier")
);
const SupplierReport = lazy(() =>
  import("@/components/Suppliers/SupplierReport")
);
const UpdateSupplier = lazy(() =>
  import("@/components/Suppliers/UpdateSupplier")
);
const Suppliers = lazy(() => import("@/components/Suppliers/Suppliers"));

const SupplierRoutes = [
  <Route
    path='supplier'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-supplier"}>
          <Suppliers />
        </PermissionChecker>
      </Suspense>
    }
    key='supplier'
  />,
  <Route
    path='supplier-report'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-supplier"}>
          <SupplierReport />
        </PermissionChecker>
      </Suspense>
    }
    key='supplier-report'
  />,
  <Route
    path='supplier/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-supplier"}>
          <DetailsSupplier />
        </PermissionChecker>
      </Suspense>
    }
    key='supplier-details'
  />,
  <Route
    path='supplier/:id/update'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-supplier"}>
          <UpdateSupplier />
        </PermissionChecker>
      </Suspense>
    }
    key='supplier-update'
  />,
];

export default SupplierRoutes;

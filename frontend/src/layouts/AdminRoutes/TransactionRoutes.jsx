import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const AddTransaction = lazy(() =>
  import("@/components/Transaction/AddTransaction")
);
const DetailTransaction = lazy(() =>
  import("@/components/Transaction/DetailTransaction")
);
const Transaction = lazy(() => import("@/components/Transaction/Transaction"));

const TransactionRoutes = [
  <Route
    path='transaction'
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-transaction"}>
          <Transaction />
        </PermissionChecker>
      </Suspense>
    }
    key='transaction'
  />,
  <Route
    path='transaction/create'
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-transaction"}>
          <AddTransaction />
        </PermissionChecker>
      </Suspense>
    }
    key='transaction-create'
  />,
  <Route
    path='transaction/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-transaction"}>
          <DetailTransaction />
        </PermissionChecker>
      </Suspense>
    }
    key='transaction-details'
  />,
];

export default TransactionRoutes;

import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const BalanceSheet = lazy(() => import("@/components/Account/BalanceSheet"));
const IncomeStatement = lazy(() =>
  import("@/components/Account/IncomeStatement")
);
const TrialBalance = lazy(() => import("@/components/Account/TrialBalance"));

const ReportRoutes = [
  <Route
    path="report/trial-balance"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-account"}>
          <TrialBalance />
        </PermissionChecker>
      </Suspense>
    }
    key="trial-balance"
  />,
  <Route
    path="report/balance-sheet"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-account"}>
          <BalanceSheet />
        </PermissionChecker>
      </Suspense>
    }
    key="balance-sheet"
  />,
  <Route
    path="report/income"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-account"}>
          <IncomeStatement />
        </PermissionChecker>
      </Suspense>
    }
    key="income-statement"
  />,
];

export default ReportRoutes;

//  ReportRoutes;

import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import CalculatePayroll from "@/components/HRM/Payroll/CalculatePayroll";
import PayslipList from "@/components/HRM/Payroll/PayslipList";
import PayslipDetails from "@/components/HRM/Payroll/PayslipDetails";

const payrollRoutes = [
  <Route
    path="calculate-payroll"
    element={
      <Suspense fallback={<Loader />}>
        {/* <PermissionChecker permission={"readAll-attendance"}>
          <CalculatePayroll />
        </PermissionChecker> */}
        <CalculatePayroll />
      </Suspense>
    }
    key="attendance"
  />,
  <Route
    path="payslip"
    element={
      <Suspense fallback={<Loader />}>
        {/* <PermissionChecker permission={"readAll-attendance"}>
          <CalculatePayroll />
        </PermissionChecker> */}
        <PayslipList />
      </Suspense>
    }
    key="payslip"
  />,
  <Route
    path="payslip/:id"
    element={
      <Suspense fallback={<Loader />}>
        {/* <PermissionChecker permission={"readAll-attendance"}>
        <CalculatePayroll />
      </PermissionChecker> */}
        <PayslipDetails />
      </Suspense>
    }
    key="payslip-details"
  />,
];

export default payrollRoutes;

//  payrollRoutes;

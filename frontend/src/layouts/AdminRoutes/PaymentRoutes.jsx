import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const GetAllManualPayment = lazy(() =>
  import("@/components/ManualPayment/GetAllManualPayment")
);
const PaymentReport = lazy(() =>
  import("@/components/ManualPayment/PaymentReport")
);
const AddCustPaymentByInvoice = lazy(() =>
  import("@/components/Payment/CustomerPaymentByInvoice")
);
const AddSupPaymentByInvoice = lazy(() =>
  import("@/components/Payment/SupplierPaymentByInvoice")
);
const GetAllPaymentMethod = lazy(() =>
  import("@/components/PaymentMethod/GetAllPaymentMethod")
);
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);

const PaymentRoutes = [
  <Route
    path='payment/supplier/:pid'
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-paymentPurchaseInvoice"}>
          <AddSupPaymentByInvoice />
        </PermissionChecker>
      </Suspense>
    }
    key='payment-supplier'
  />,
  // <Route
  //   path='/payment-report'
  //   element={
  //     <Suspense fallback={<Loader />}>
  //       <PermissionChecker permission={"readAll-manualPayment"}>
  //         <PaymentReport />
  //       </PermissionChecker>
  //     </Suspense>
  //   }
  //   key='payment-report'
  // />,
  <Route
    path='payment/customer/:pid'
    exact
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"create-paymentSaleInvoice"}>
          <AddCustPaymentByInvoice />
        </PermissionChecker>
      </Suspense>
    }
    key='payment-customer'
  />,
  <Route
    path='manual-payment'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-manualPayment"}>
          <GetAllManualPayment />
        </PermissionChecker>
      </Suspense>
    }
    key='manual-payment'
  />,
  <Route
    path='payment-method'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-paymentMethod"}>
          <GetAllPaymentMethod />
        </PermissionChecker>
      </Suspense>
    }
    key='payment-method'
  />,
];

export default PaymentRoutes;

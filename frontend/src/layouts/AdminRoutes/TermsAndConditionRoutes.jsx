import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const DetailsTermsAndConditions = lazy(() =>
  import("@/components/TermsAndConditions/DetailsTermsAndConditions")
);
const GetAllTermsAndConditions = lazy(() =>
  import("@/components/TermsAndConditions/GetAllTermsAndConditions")
);

const TermsAndConditionRoutes = [
  <Route
    path='terms-and-condition'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-termsAndCondition"}>
          <GetAllTermsAndConditions />
        </PermissionChecker>
      </Suspense>
    }
    key='terms-and-condition'
  />,
  <Route
    path='terms-and-condition/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-termsAndCondition"}>
          <DetailsTermsAndConditions />
        </PermissionChecker>
      </Suspense>
    }
    key='terms-and-condition-details'
  />,
];

export default TermsAndConditionRoutes;

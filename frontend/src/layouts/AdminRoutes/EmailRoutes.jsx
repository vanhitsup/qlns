import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import Loader from "./../../components/Loader/Loader";
const GetAllEmail = lazy(() => import("@/components/Email/GetAllEmail"));

const EmailRoutes = [
  <Route
    path='email'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-email"}>
          <GetAllEmail />
        </PermissionChecker>
      </Suspense>
    }
    key='email'
  />,
];
export default EmailRoutes;

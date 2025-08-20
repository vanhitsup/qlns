import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

export default function useSettingRoutes() {
  const AppSettings = lazy(() =>
    import("@/components/Settings/AppSettings/AppSettings")
  );
  const InvoiceSetting = lazy(() =>
    import("@/components/Settings/InvoiceSetting")
  );
  const routes = [
    <Route
      path='app-settings'
      exact
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readAll-setting"}>
            <AppSettings />
          </PermissionChecker>
        </Suspense>
      }
      key='settings'
    />,
    <Route
      path='company-settings'
      exact
      element={
        <Suspense fallback={<Loader />}>
          <PermissionChecker permission={"readAll-setting"}>
            <InvoiceSetting />
          </PermissionChecker>
        </Suspense>
      }
      key='company-setting'
    />,
  ];
  return routes;
}

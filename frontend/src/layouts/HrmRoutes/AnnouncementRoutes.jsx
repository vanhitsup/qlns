import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
const GetAllAnnouncement = lazy(() =>
  import("@/components/HRM/Announcement/GetAllAnnouncement")
);
const UpdateAnnouncement = lazy(() => {
  import("@/components/HRM/Announcement/UpdateAnnouncement");
});

const AnnouncementRoutes = [
  <Route
    path="announcement"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-announcement"}>
          <GetAllAnnouncement />
        </PermissionChecker>
      </Suspense>
    }
    key="announcement"
  />,
  <Route
    path="announcement/:id/update"
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-announcement"}>
          <UpdateAnnouncement />
        </PermissionChecker>
      </Suspense>
    }
    key="announcement"
  />,
];

export default AnnouncementRoutes;

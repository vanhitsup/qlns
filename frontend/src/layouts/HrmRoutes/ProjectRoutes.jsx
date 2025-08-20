import Loader from "@/components/Loader/Loader";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const GetAllProject = lazy(() =>
  import("@/components/HRM/Project/Project/GetAllProject")
);
const GetAllTeam = lazy(() =>
  import("@/components/HRM/Project/Team/GetAllTeam")
);
const GetAllTaskPriority = lazy(() =>
  import("@/components/HRM/Project/TaskPriority/GetAllTaskPriority")
);
const KanbanBoard2 = lazy(() =>
  import("@/components/HRM/Project/kanbanBoard/KanbanBoard2")
);
const GetAllMilestone = lazy(() =>
  import("@/components/HRM/Project/Milestone/GetAllMilestone")
);
const UpdateMilestone = lazy(() =>
  import("@/components/HRM/Project/Milestone/UpdateMilestone")
);
const GetAllTaskStatus = lazy(() =>
  import("@/components/HRM/Project/TaskStatus/GetAllTaskStatus")
);
const UpdateTaskStatus = lazy(() =>
  import("@/components/HRM/Project/TaskStatus/UpdateTaskStatus")
);
const UpdateProject = lazy(() =>
  import("@/components/HRM/Project/Project/UpdateProject")
);
const UpdateStatus = lazy(() =>
  import("@/components/HRM/Project/Project/UpdateStatus")
);
const ProjectRoutes = [
  <Route
    path='project'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-project"}>
          <GetAllProject />
        </PermissionChecker>
      </Suspense>
    }
    key='project'
  />,
  <Route
    path='project/update/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-project"}>
          <UpdateProject />
        </PermissionChecker>
      </Suspense>
    }
    key='project-update'
  />,
  <Route
    path='project/status/update/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-project"}>
          <UpdateStatus />
        </PermissionChecker>
      </Suspense>
    }
    key='project-update-status'
  />,
  <Route
    path='project/kanban/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-project"}>
          <KanbanBoard2 />
        </PermissionChecker>
      </Suspense>
    }
    key='project-kanban'
  />,
  <Route
    path='project/milestone/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-milestone"}>
          <GetAllMilestone />
        </PermissionChecker>
      </Suspense>
    }
    key='project-milestone'
  />,
  <Route
    path='project/milestone/update/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-milestone"}>
          <UpdateMilestone />
        </PermissionChecker>
      </Suspense>
    }
    key='project-milestone-update'
  />,
  <Route
    path='project/task-status/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readSingle-taskStatus"}>
          <GetAllTaskStatus />
        </PermissionChecker>
      </Suspense>
    }
    key='project-taskStatus'
  />,
  <Route
    path='project/task-status/update/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"update-taskStatus"}>
          <UpdateTaskStatus />
        </PermissionChecker>
      </Suspense>
    }
    key='project-tasks-status-update'
  />,
  <Route
    path='team'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-projectTeam"}>
          <GetAllTeam />
        </PermissionChecker>
      </Suspense>
    }
    key='team'
  />,
  <Route
    path='task-priority'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-priority"}>
          <GetAllTaskPriority />
        </PermissionChecker>
      </Suspense>
    }
    key='task-priority-hrm'
  />,
];
export default ProjectRoutes;

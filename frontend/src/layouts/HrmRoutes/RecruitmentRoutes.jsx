import Loader from "@/components/Loader/Loader";
import { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
const PermissionChecker = lazy(() =>
  import("@/components/PrivacyComponent/PermissionChecker")
);
const GetAllJobCategory = lazy(() => import("@/components/HRM/Recruitment/JobCategory/GetAllJobCategory"));
const GetAllJobType = lazy(() => import("@/components/HRM/Recruitment/JobType/GetAllJobType"));
const GetAllJobLocation = lazy(() => import("@/components/HRM/Recruitment/JobLocation/GetAllJobLocation"));
const GetAllJobSkills = lazy(() => import("@/components/HRM/Recruitment/JobSkills/GetAllJobSkills"));
const GetAllJobWorkExperience = lazy(() => import("@/components/HRM/Recruitment/JobWorkExperience/GetAllJobWorkExperience"));
const GetAllJob = lazy(() => import("@/components/HRM/Recruitment/Job/GetAllJob"));
const UpdateJob = lazy(() => import("@/components/HRM/Recruitment/Job/UpdateJob"));
const DetailsJob = lazy(() => import("@/components/HRM/Recruitment/Job/DetailsJob"));
const GetAllJobApplication = lazy(() => import("@/components/HRM/Recruitment/JobApplication/GetAllJobApplication"));
const DetailsApplication = lazy(() => import("@/components/HRM/Recruitment/JobApplication/DetailsApplication"));
const GetAllJobInterview = lazy(() => import("@/components/HRM/Recruitment/JobInterview/GetAllJobInterview"));
const DetailsJobInterview = lazy(() => import("@/components/HRM/Recruitment/JobInterview/DetailsJobInterview"));
const JobKanbanBoard = lazy(() => import("@/components/HRM/Recruitment/JobBoard/JobKanbanBoard"));

const RecruitmentRoutes = [
  <Route
    path='job-category'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-jobCategory"}>
          <GetAllJobCategory/>
        </PermissionChecker>
      </Suspense>
    }
    key='job-category'
  />,


  <Route
    path='job-type'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-jobType"}>
          <GetAllJobType/>
        </PermissionChecker>
      </Suspense>
    }
    key='job-type'
  />,
  <Route
    path='job-location'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-jobLocation"}>
          <GetAllJobLocation/>
        </PermissionChecker>
      </Suspense>
    }
    key='job-type'
  />,
  <Route
    path='job-skills'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-jobSkills"}>
          <GetAllJobSkills/>
        </PermissionChecker>
      </Suspense>
    }
    key='job-skills'
  />,
  <Route
    path='job-experience'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-jobWorkExperience"}>
          <GetAllJobWorkExperience/>
        </PermissionChecker>
      </Suspense>
    }
    key='job-experience'
  />,
  <Route
    path='job'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-job"}>
          <GetAllJob/>
        </PermissionChecker>
      </Suspense>
    }
    key='job'
  />,

  <Route
    path='job/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-job"}>
          <DetailsJob/>
        </PermissionChecker>
      </Suspense>
    }
    key='job-details'
  />,
  <Route
    path='job/:id/update'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-job"}>
          <UpdateJob/>
        </PermissionChecker>
      </Suspense>
    }
    key='job-update'
  />,
  <Route
    path='job-application'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-jobApplication"}>
          <GetAllJobApplication/>
        </PermissionChecker>
      </Suspense>
    }
    key='job-update'
  />,
  <Route
    path='job-application/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-jobApplication"}>
          <DetailsApplication/>
        </PermissionChecker>
      </Suspense>
    }
    key='job-update'
  />,
  <Route
    path='job-interview'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-jobInterview"}>
          <GetAllJobInterview/>
        </PermissionChecker>
      </Suspense>
    }
    key='job-interview'
  />,

  <Route
    path='job-interview/:id'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-jobInterview"}>
          <DetailsJobInterview/>
        </PermissionChecker>
      </Suspense>
    }
    key='single-job-interview'
  />,
  <Route
    path='job-board'
    element={
      <Suspense fallback={<Loader />}>
        <PermissionChecker permission={"readAll-jobInterview"}>
          <JobKanbanBoard/>
        </PermissionChecker>
      </Suspense>
    }
    key='job-board'
  />,
];

export default RecruitmentRoutes;

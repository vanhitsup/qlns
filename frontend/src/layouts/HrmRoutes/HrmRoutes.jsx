import AnnouncementRoutes from "./AnnouncementRoutes";
import AttendanceRoutes from "./AttendanceRoutes";
import AwardRoutes from "./AwardRoutes";
import DepartmentRoutes from "./DepartmentRoutes";
import DesignationRoutes from "./DesignationRoutes";
import EmploymentRoutes from "./EmploymentRoutes";
import HolidayRoutes from "./HolidayRoutes";
import LeavePolicyRoutes from "./LeavePolicyRoutes";
import LeaveRoutes from "./LeaveRoutes";
import ProjectRoutes from "./ProjectRoutes";
import RecruitmentRoutes from "./RecruitmentRoutes";
import RoleRoutes from "./RoleRoutes";
import ShiftRoutes from "./ShiftRoutes";
import UserRoutes from "./UserRoute";
import { Route } from "react-router-dom";
import Dashboard from "@/components/HRM/Dashboard/Dashboard";
import payrollRoutes from "./payrollRoutes";

export default function useHrmRoutes() {
  return [
    ...AttendanceRoutes,
    ...ShiftRoutes,
    ...DepartmentRoutes,
    ...DesignationRoutes,
    ...EmploymentRoutes,
    ...LeaveRoutes,
    ...AwardRoutes,
    ...LeavePolicyRoutes,
    ...AnnouncementRoutes,
    ...HolidayRoutes,
    ...ProjectRoutes,
    ...RecruitmentRoutes,
    ...UserRoutes,
    ...RoleRoutes,
    ...payrollRoutes,
    <Route index key="hrm Dashboard" element={<Dashboard />} />,
  ];
}

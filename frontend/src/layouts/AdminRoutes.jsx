import { Route } from "react-router-dom";
import AccountRoutes from "./AdminRoutes/AccountRoutes";
import CommonRoutes from "./AdminRoutes/CommonRoutes";
import CourierMediumRoutes from "./AdminRoutes/CourierMediumRoutes";
import EmailRoutes from "./AdminRoutes/EmailRoutes";
import OrderRoutes from "./AdminRoutes/OrderRoutes";
import PaymentRoutes from "./AdminRoutes/PaymentRoutes";
import TermsAndConditionRoutes from "./AdminRoutes/TermsAndConditionRoutes";
import TransactionRoutes from "./AdminRoutes/TransactionRoutes";
import useSettingRoutes from "./AdminRoutes/useSettingRoutes";
import useHrmRoutes from "./HrmRoutes/HrmRoutes";
import AttendanceRoutes from "./HrmRoutes/AttendanceRoutes";
import ShiftRoutes from "./HrmRoutes/ShiftRoutes";
import DepartmentRoutes from "./HrmRoutes/DepartmentRoutes";
import DesignationRoutes from "./HrmRoutes/DesignationRoutes";
import EmploymentRoutes from "./HrmRoutes/EmploymentRoutes";
import LeaveRoutes from "./HrmRoutes/LeaveRoutes";
import AwardRoutes from "./HrmRoutes/AwardRoutes";
import LeavePolicyRoutes from "./HrmRoutes/LeavePolicyRoutes";
import AnnouncementRoutes from "./HrmRoutes/AnnouncementRoutes";
import HolidayRoutes from "./HrmRoutes/HolidayRoutes";
import ProjectRoutes from "./HrmRoutes/ProjectRoutes";
import RecruitmentRoutes from "./HrmRoutes/RecruitmentRoutes";
import UserRoutes from "./HrmRoutes/UserRoute";
import RoleRoutes from "./HrmRoutes/RoleRoutes";
import payrollRoutes from "./HrmRoutes/payrollRoutes";
import ReportRoutes from "./AdminRoutes/ReportRoutes";

export default function useAdminRoutes() {
  const SettingsRoutes = useSettingRoutes();
  const HrmRoutes = useHrmRoutes();
  const routes = [
    ...TransactionRoutes,
    ...AccountRoutes,
    ...ReportRoutes,
    ...TermsAndConditionRoutes,
    ...OrderRoutes,
    ...CourierMediumRoutes,
    ...PaymentRoutes,
    ...CommonRoutes,
    ...SettingsRoutes,
    ...EmailRoutes,
    // hrm routes
    // TODO : if i un comment this i have to remove /hrm/ from every where in project
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
    // <Route path="hrm" key="hrm">
    //   {HrmRoutes}
    // </Route>,
  ];

  return routes;
}

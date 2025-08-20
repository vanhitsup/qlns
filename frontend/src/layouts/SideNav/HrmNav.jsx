import { SettingOutlined, SolutionOutlined } from "@ant-design/icons";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaBusinessTime } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineVerifiedUser, MdPolicy } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { TbAward, TbShoppingCartCog } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";

export default function useHrmNav() {
  return [
    {
      label: (
        <NavLink to="/admin/hrm/staff">
          <span>Staff</span>
        </NavLink>
      ),
      permit: {
        permissions: ["readAll-user"],
        operator: "or",
      },
      key: "staff",
      icon: <HiOutlineUserGroup />,
    },
    {
      label: (
        <NavLink to="/admin/hrm/role">
          <span>Role & Permissions</span>
        </NavLink>
      ),
      permit: {
        permissions: ["readAll-role"],
        operator: "or",
      },
      key: "role",
      icon: <GrUserAdmin />,
    },
    {
      label: (
        <NavLink to="/admin/hrm/attendance">
          <span>Attendance</span>
        </NavLink>
      ),
      permit: {
        permissions: ["readAll-attendance"],
        operator: "or",
      },
      key: "attendance",
      icon: <MdOutlineVerifiedUser />,
    },
    {
      label: "Payroll",
      key: "payroll",
      icon: <TbShoppingCartCog />,
      children: [
        {
          label: (
            <NavLink to="/admin/hrm/calculate-payroll">
              <span>Calculate Payroll</span>
            </NavLink>
          ),
          key: "calculate-payroll",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/payslip">
              <span>Payslip List</span>
            </NavLink>
          ),
          key: "payslip",
          icon: <MdPolicy />,
        },
      ],
    },
    {
      label: (
        <NavLink to="/admin/hrm/shift">
          <span>Shift</span>
        </NavLink>
      ),
      permit: {
        permissions: ["readAll-shift"],
        operator: "or",
      },
      key: "shift",
      icon: <FaBusinessTime />,
    },
    {
      label: (
        <NavLink to="/admin/hrm/department">
          <span>Department</span>
        </NavLink>
      ),
      key: "department",
      icon: <HiOutlineBuildingOffice2 />,
    },
    {
      label: (
        <NavLink to="/admin/hrm/designation">
          <span>Designation</span>
        </NavLink>
      ),
      key: "designation",
      icon: <SolutionOutlined />,
    },
    {
      label: (
        <NavLink to="/admin/hrm/employment-status">
          <span>Employment Status</span>
        </NavLink>
      ),
      key: "employmentStatus",
      icon: <FaBusinessTime />,
    },
    {
      label: (
        <NavLink to="/admin/hrm/leave">
          <span>Leave</span>
        </NavLink>
      ),
      key: "Leave",
      icon: <AiOutlineFileProtect />,
    },
    {
      label: (
        <NavLink to="/admin/hrm/award">
          <span>Award</span>
        </NavLink>
      ),
      key: "award",
      icon: <TbAward />,
    },
    {
      label: (
        <NavLink to="/admin/hrm/leave-policy">
          <span>Leave Policy</span>
        </NavLink>
      ),
      key: "leave-policy",
      icon: <MdPolicy />,
    },
    {
      label: (
        <NavLink to="/admin/hrm/announcement">
          <span>Announcement</span>
        </NavLink>
      ),
      key: "announcement",
      icon: <MdPolicy />,
    },

    {
      label: "Holiday",
      key: "holiday",
      icon: <TbShoppingCartCog />,
      children: [
        {
          label: (
            <NavLink to="/admin/hrm/weekly-holiday">
              <span>Weekly Holiday</span>
            </NavLink>
          ),
          key: "weekly-holiday",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/public-holiday">
              <span>Public Holiday</span>
            </NavLink>
          ),
          key: "public-holiday",
          icon: <MdPolicy />,
        },
      ],
    },
    {
      label: "Project",
      key: "project",
      icon: <SettingOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/hrm/project">
              <span>Project</span>
            </NavLink>
          ),
          key: "project",
          icon: <SettingOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/team">
              <span>Team</span>
            </NavLink>
          ),
          key: "team",
          icon: <SettingOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/task-priority">
              <span>Task Priority</span>
            </NavLink>
          ),
          key: "task-priority",
          icon: <SettingOutlined />,
        },
      ],
    },

    {
      label: "Recruitment",
      key: "Recruitment",
      icon: <TbShoppingCartCog />,
      children: [
        {
          label: (
            <NavLink to="/admin/hrm/job-category">
              <span>Job Category</span>
            </NavLink>
          ),
          key: "job-category",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/job-type">
              <span>Job Type</span>
            </NavLink>
          ),
          key: "job-type",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/job-location">
              <span>Job Location</span>
            </NavLink>
          ),
          key: "job-location",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/job-skills">
              <span>Job Skills</span>
            </NavLink>
          ),
          key: "job-skills",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/job-experience">
              <span>Job Work Experience</span>
            </NavLink>
          ),
          key: "job-experience",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/job">
              <span>Job</span>
            </NavLink>
          ),
          key: "job",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/job-application">
              <span>Job Application</span>
            </NavLink>
          ),
          key: "job-application",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/job-board">
              <span>Job Board</span>
            </NavLink>
          ),
          key: "job-board",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/hrm/job-interview">
              <span>Job Interview</span>
            </NavLink>
          ),
          key: "job-interview",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/recruitment">
              <span>Job Desk</span>
            </NavLink>
          ),
          key: "job-desk",
          icon: <MdPolicy />,
        },
      ],
    },
  ];
}

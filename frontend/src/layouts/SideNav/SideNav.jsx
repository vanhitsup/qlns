import useSettings from "@/Hooks/useSettings";
import { cn } from "@/utils/functions";
import {
  FileDoneOutlined,
  FileOutlined,
  FileSyncOutlined,
  HomeOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { FaStore, FaUsersCog } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdEmail, MdInventory, MdOutlinePermMedia } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Menu from "../../UI/Menu";
import usePermissions from "../../utils/usePermissions";
import useSettingNav from "./SettingNav";
import SideNavLoader from "./SideNavLoader";
import { GoTasklist } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrUserAdmin } from "react-icons/gr";
import { SolutionOutlined } from "@ant-design/icons";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaBusinessTime } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineVerifiedUser, MdPolicy } from "react-icons/md";
import { TbAward, TbShoppingCartCog } from "react-icons/tb";

const SideNav = ({ collapsed, setCollapsed }) => {
  const { permissions } = usePermissions();
  const [active, setActive] = useState({
    isSetting: false,
  });
  const { loading } = useSelector((state) => state.auth);
  const { isSaleCommission, isPos } = useSettings([
    "isSaleCommission",
    "isPos",
  ]);

  const menuContainerRef = useRef(null);

  const menu = [
    Array.isArray(permissions) &&
      permissions.length > 0 && {
        label: (
          <NavLink to="/admin/dashboard">
            <span>BẢNG ĐIỀU KHIỂN</span>
          </NavLink>
        ),
        key: "dashboard",
        icon: <HomeOutlined />,
      },

    {
      label: "Tổ chức nhân sự",
      key: "hr",
      icon: <TbShoppingCartCog />,
      children: [
        {
          label: (
            <NavLink to="/admin/add-staff">
              <span>Lập hồ sơ nhân sự</span>
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
            <NavLink to="/admin/staff">
              <span>Employee List</span>
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
            <NavLink to="/admin/role">
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
            <NavLink to="/admin/department">
              <span>Department</span>
            </NavLink>
          ),
          key: "department",
          icon: <HiOutlineBuildingOffice2 />,
        },
        {
          label: (
            <NavLink to="/admin/designation">
              <span>Designation</span>
            </NavLink>
          ),
          key: "designation",
          icon: <SolutionOutlined />,
        },
      ],
    },
    {
      label: (
        <NavLink to="/admin/attendance">
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
            <NavLink to="/admin/calculate-payroll">
              <span>Calculate Payroll</span>
            </NavLink>
          ),
          key: "calculate-payroll",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/payslip">
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
        <NavLink to="/admin/shift">
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
        <NavLink to="/admin/employment-status">
          <span>Employment Status</span>
        </NavLink>
      ),
      key: "employmentStatus",
      icon: <FaBusinessTime />,
    },
    {
      label: (
        <NavLink to="/admin/leave">
          <span>Leave</span>
        </NavLink>
      ),
      key: "Leave",
      icon: <AiOutlineFileProtect />,
    },
    {
      label: "Holiday",
      key: "holiday",
      icon: <TbShoppingCartCog />,
      children: [
        {
          label: (
            <NavLink to="/admin/weekly-holiday">
              <span>Weekly Holiday</span>
            </NavLink>
          ),
          key: "weekly-holiday",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/public-holiday">
              <span>Public Holiday</span>
            </NavLink>
          ),
          key: "public-holiday",
          icon: <MdPolicy />,
        },
      ],
    },
    {
      label: (
        <NavLink to="/admin/leave-policy">
          <span>Leave Policy</span>
        </NavLink>
      ),
      key: "leave-policy",
      icon: <MdPolicy />,
    },
    {
      label: (
        <NavLink to="/admin/announcement">
          <span>Announcement</span>
        </NavLink>
      ),
      key: "announcement",
      icon: <MdPolicy />,
    },
    {
      label: "ACCOUNTS",
      permit: {
        permissions: ["create-account", "readAll-account"],
        operator: "or",
      },
      key: "accounts",
      icon: <WalletOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/account/">
              <span>Account</span>
            </NavLink>
          ),
          key: "accountList",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/transaction/">
              <span>Transaction</span>
            </NavLink>
          ),
          key: "transactionList",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: "Reports",
      permit: {
        permissions: ["create-account", "readAll-account"],
        operator: "or",
      },
      key: "reports",
      icon: <WalletOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/report/trial-balance">
              <span>Trial Balance</span>
            </NavLink>
          ),
          key: "trialBalance",
          icon: <FileDoneOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/report/balance-sheet">
              <span>Balance Sheet</span>
            </NavLink>
          ),
          key: "balanceSheet",
          icon: <FileOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/report/income">
              <span>Income Statement</span>
            </NavLink>
          ),
          key: "incomeStatement",
          icon: <FileSyncOutlined />,
        },
      ],
    },
    {
      label: (
        <NavLink to="/admin/award">
          <span>Award</span>
        </NavLink>
      ),
      key: "award",
      icon: <TbAward />,
    },
    {
      label: "Project",
      key: "project",
      icon: <SettingOutlined />,
      children: [
        {
          label: (
            <NavLink to="/admin/project">
              <span>Project</span>
            </NavLink>
          ),
          key: "project",
          icon: <SettingOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/team">
              <span>Team</span>
            </NavLink>
          ),
          key: "team",
          icon: <SettingOutlined />,
        },
        {
          label: (
            <NavLink to="/admin/task-priority">
              <span>Task Priority</span>
            </NavLink>
          ),
          key: "task-priority",
          icon: <SettingOutlined />,
        },
      ],
    },
    {
      label: (
        <NavLink to="/admin/task">
          <span>Task</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-task", "readAll-task"],
        operator: "or",
      },
      key: "task global",
      icon: <GoTasklist />,
    },
    {
      label: "Recruitment",
      key: "Recruitment",
      icon: <TbShoppingCartCog />,
      children: [
        {
          label: (
            <NavLink to="/admin/job-category">
              <span>Job Category</span>
            </NavLink>
          ),
          key: "job-category",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/job-type">
              <span>Job Type</span>
            </NavLink>
          ),
          key: "job-type",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/job-location">
              <span>Job Location</span>
            </NavLink>
          ),
          key: "job-location",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/job-skills">
              <span>Job Skills</span>
            </NavLink>
          ),
          key: "job-skills",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/job-experience">
              <span>Job Work Experience</span>
            </NavLink>
          ),
          key: "job-experience",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/job">
              <span>Job</span>
            </NavLink>
          ),
          key: "job",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/job-application">
              <span>Job Application</span>
            </NavLink>
          ),
          key: "job-application",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/job-board">
              <span>Job Board</span>
            </NavLink>
          ),
          key: "job-board",
          icon: <MdPolicy />,
        },
        {
          label: (
            <NavLink to="/admin/job-interview">
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

    {
      label: (
        <NavLink to="/admin/media">
          <span>MEDIA</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-media", "readAll-media"],
        operator: "or",
      },
      key: "media",
      icon: <MdOutlinePermMedia />,
    },
    {
      label: (
        <NavLink to="/admin/email">
          <span>EMAIL</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-email", "readAll-email"],
        operator: "or",
      },
      key: "EMAIL",
      icon: <MdEmail />,
    },
  ];

  const SettingMenu = useSettingNav();

  useEffect(() => {
    if (active.isSetting && menuContainerRef.current) {
      menuContainerRef.current.scrollTo({
        top: 0,
        // behavior: "smooth",
      });
    }
  }, [active.isSetting]);
  return (
    <div
      ref={menuContainerRef}
      className="overflow-y-auto no-scrollbar h-[calc(100vh-100px)] pb-4">
      {loading ? (
        <SideNavLoader />
      ) : (
        <div className="relative">
          <div
            className={cn(
              `absolute w-full  transition-all duration-300 ${
                active.isSetting ? "left-[280px]" : "left-0"
              }`
            )}>
            <Menu
              items={menu}
              setCollapsed={setCollapsed}
              permissions={permissions}
              collapsed={collapsed}
            />
            {Array.isArray(permissions) && permissions.length > 0 && (
              <>
                {/* settings */}
                <div
                  className={cn(
                    "px-4 flex items-center justify-between font-Popins  hover:bg-[rgb(71,74,120)] py-3 cursor-pointer",
                    {
                      "flex items-center justify-center px-0 text-lg":
                        collapsed,
                    }
                  )}
                  onClick={() =>
                    setActive({ isCrm: false, isSetting: true, isHrm: false })
                  }>
                  <span className="flex items-center gap-1">
                    <SettingOutlined /> {!collapsed && "Settings"}
                  </span>
                  {!collapsed && <IoIosArrowForward />}
                </div>
              </>
            )}
          </div>

          {/* setting menu */}
          <div
            className={cn(
              `absolute w-full  transition-all duration-300 ${
                active.isSetting ? "left-0" : "-left-[280px]"
              }`
            )}>
            <div
              className={cn(
                "px-4 flex items-center font-medium gap-1 font-Popins bg-[rgb(71,74,95)] hover:bg-[rgb(71,74,120)] py-3 cursor-pointer",
                {
                  "flex items-center justify-center text-lg": collapsed,
                }
              )}
              onClick={() =>
                setActive({ isCrm: false, isSetting: false, isHrm: false })
              }>
              <IoIosArrowBack /> {!collapsed && "Back to menu"}
            </div>
            <hr className=" border-gray-500" />
            <Menu
              items={SettingMenu}
              setCollapsed={setCollapsed}
              permissions={permissions}
              collapsed={collapsed}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SideNav;

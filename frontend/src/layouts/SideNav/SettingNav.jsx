import {
  AppstoreOutlined,
  FileProtectOutlined,
  ImportOutlined,
  OrderedListOutlined,
  SettingOutlined,
  TeamOutlined,
  UngroupOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { BiSolidDiscount } from "react-icons/bi";
import { BsBuildingFillGear } from "react-icons/bs";
import { GiTicket } from "react-icons/gi";
import {
  MdAcUnit,
  MdOutlineAttachMoney,
  MdOutlineColorLens,
  MdOutlineEditAttributes,
} from "react-icons/md";
import { TbShoppingCartCog } from "react-icons/tb";
import { NavLink } from "react-router-dom";

export default function useSettingNav() {
  return [
    {
      label: (
        <NavLink to="/admin/company-settings">
          <span>Company settings</span>
        </NavLink>
      ),
      permit: {
        permissions: ["update-setting"],
        operator: "or",
      },
      key: "invoiceSetting",
      icon: <BsBuildingFillGear />,
    },
    {
      label: (
        <NavLink to="/admin/app-settings">
          <span>App settings</span>
        </NavLink>
      ),
      permit: {
        permissions: ["update-setting"],
        operator: "or",
      },
      key: "appSettings",
      icon: <MdOutlineColorLens />,
    },
    {
      label: (
        <NavLink to="/admin/currency">
          <span>Currency</span>
        </NavLink>
      ),
      permit: {
        permissions: ["create-currency", "readAll-currency"],
        operator: "or",
      },
      key: "Currency",
      icon: <MdOutlineAttachMoney />,
    },

    {
      label: (
        <NavLink to="/admin/priority">
          <span>Priority</span>
        </NavLink>
      ),
      key: "Priority",
      icon: <UsergroupAddOutlined />,
    },
  ];
}

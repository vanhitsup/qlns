import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import {
  clearAccountList,
  deleteAccount,
  loadAllAccountPaginated,
} from "../../redux/rtk/features/account/accountSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddAccount from "./AddAccount";

const GetAllAccount = () => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.accounts) || {};
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/account/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },

    {
      id: 2,
      title: "Account",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => <Link to={`/admin/account/${id}`}>{name}</Link>,
      renderCsv: (name) => name,
    },

    {
      id: 3,
      title: "Account Type ",
      dataIndex: "account",
      key: "account",
      render: (account) => account?.name,
      renderCsv: (account) => account?.name,
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: ({ id }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/account/${id}`} />,
          key: "view",
        },
        id > 16 && {
          label: (
            <CommonDelete
              id={id}
              title={"Delete"}
              permission={"delete-account"}
              deleteThunk={deleteAccount}
              loadThunk={loadAllAccountPaginated}
              query={pageConfig}
            />
          ),
          key: "delete",
        },
      ],
      csvOff: true,
    },
  ];

  useEffect(() => {
    dispatch(loadAllAccountPaginated(pageConfig));

    return () => {
      dispatch(clearAccountList());
    };
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Accounts"}
      extra={
        <CreateDrawer
          permission={"create-account"}
          title={"Create Account"}
          width={35}>
          <AddAccount />
        </CreateDrawer>
      }>
      <UserPrivateComponent permission={"readAll-account"}>
        <TableComponent
          list={list}
          columns={columns}
          title={"Account List"}
          total={total}
          loading={loading}
          setPageConfig={setPageConfig}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllAccount;

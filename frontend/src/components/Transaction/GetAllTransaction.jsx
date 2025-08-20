import { loadAllAccount } from "@/redux/rtk/features/account/accountSlice";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import {
  clearTransactionList,
  loadAllTransaction,
} from "../../redux/rtk/features/transaction/transactionSlice";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddTransaction from "./AddTransaction";

const GetAllTransaction = () => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.transactions);
  const { list: accounts } = useSelector((state) => state.accounts);
  const { RangePicker } = DatePicker;
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });
  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/transaction/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },

    {
      id: 2,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },

    {
      id: 3,
      title: "Debit Account",
      dataIndex: "debit",
      key: "debit",
      render: (debit) => debit?.name,
      renderCsv: (debit) => debit?.name,
    },

    {
      id: 4,
      title: "Credit Account",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit?.name,
      renderCsv: (credit) => credit?.name,
    },

    {
      id: 5,
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      id: 6,
      title: "Particulars",
      dataIndex: "particulars",
      key: "particulars",
    },
  ];
  const filters = [
    {
      key: "debitId",
      label: "Debit A/C",
      type: "select",
      options: accounts?.map((item) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      }),
      className: "min-w-[100px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "creditId",
      label: "Credit A/C",
      type: "select",
      options: accounts?.map((item) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      }),
      className: "min-w-[100px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  useEffect(() => {
    dispatch(loadAllAccount());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadAllTransaction(pageConfig));
    return () => {
      dispatch(clearTransactionList());
    };
  }, [dispatch, pageConfig]);

  const onCalendarChange = (dates) => {
    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    setPageConfig((prev) => {
      return {
        ...prev,
        startDate,
        endDate,
      };
    });
  };

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Transactions"}
      extra={
        <div className="flex gap-3 md:justify-end justify-between  items-center">
          <RangePicker
            className="range-picker w-3/6"
            onCalendarChange={onCalendarChange}
            defaultValue={[
              dayjs(pageConfig.startDate, "YYYY-MM-DD"),
              dayjs(pageConfig.endDate, "YYYY-MM-DD"),
            ]}
          />{" "}
          <CreateDrawer
            width={35}
            permission={"create-transaction"}
            title={"Create Transaction"}>
            <AddTransaction />
          </CreateDrawer>
        </div>
      }>
      {" "}
      <UserPrivateComponent permission={"readAll-transaction"}>
        <TableComponent
          list={list}
          total={total?._count?.id}
          columns={columns}
          loading={loading}
          setPageConfig={setPageConfig}
          title={"Transaction List"}
          filters={filters}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllTransaction;

import { Card, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadIncomeStatement } from "../../redux/rtk/features/account/accountSlice";
import IncomeStatementInvoice from "../Invoice/IncomeStatementInvoice";
import Loader from "../Loader/Loader";

const IncomeStatement = () => {
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [pageConfig, setPageConfig] = useState({
    query: "is",
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });

  const { incomeStatement: data, loading } =
    useSelector((state) => state?.accounts) || null;

  const handleChange = (value, key) => {
    setPageConfig({ ...pageConfig, [key]: value });
  };

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

  useEffect(() => {
    dispatch(loadIncomeStatement(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <Card>
        <div>
          <div className="card-title flex justify-between items-center mb-2">
            <h5 className="text-xl flex flex-col gap-2 mb-3">
              <span className="ml-2 report-section-card-title ">
                Income Statement{" "}
              </span>

              <RangePicker
                className="range-picker"
                onCalendarChange={onCalendarChange}
                defaultValue={[
                  dayjs(pageConfig.startDate, "YYYY-MM-DD"),
                  dayjs(pageConfig.endDate, "YYYY-MM-DD"),
                ]}
              />
            </h5>
            {data && (
              <IncomeStatementInvoice data={data} title="Income Statement" />
            )}
          </div>
          {!loading && (
            <div className="border-gray-200 w-full rounded bg-white overflow-x-auto">
              <table className="w-full">
                <h5 className="mt-2 mb-1 ml-2 font-semibold text-base">
                  Revenue{" "}
                </h5>
                <thead className="text-gray-600 text-[13px]  font-bold border-gray tracking-wider text-left px-5 py-3 hover:cursor-pointer uppercase border-b-2 border-gray-200">
                  <tr className="border-b border-gray">
                    <th
                      scope="col"
                      className="text-gray-200 border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left  font-semibold uppercase tracking-wider">
                      Account
                    </th>
                    <th
                      scope="col"
                      className="text-gray-200 border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-900 text-left  font-semibold uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data?.revenue.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-100 hover:cursor-pointer">
                          <td className="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
                            {item.subAccount}
                          </td>
                          <td className="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
                            {item.balance
                              ? Number(item.balance).toFixed(3)
                              : ""}
                          </td>
                        </tr>
                      );
                    })}

                  <tr className="hover:bg-gray-100 hover:cursor-pointer">
                    <td className="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
                      {" "}
                      <strong>TOTAL</strong>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
                      <strong>{data?.totalRevenue.toFixed(3)}</strong>
                    </td>
                  </tr>

                  <h5 className="mt-2 mb-1 ml-2 font-semibold text-base">
                    {" "}
                    Expense
                  </h5>

                  {data &&
                    data?.expense.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-100 hover:cursor-pointer">
                          <td className="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
                            {item.subAccount}
                          </td>
                          <td className="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
                            {item.balance
                              ? Number(item.balance).toFixed(3)
                              : ""}
                          </td>
                        </tr>
                      );
                    })}

                  <tr className="hover:bg-gray-100 hover:cursor-pointer">
                    <td className="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
                      <strong>TOTAL</strong>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
                      <strong>{data?.totalExpense.toFixed(3)}</strong>
                    </td>
                  </tr>

                  <h5 className="mt-2 mb-1 ml-2 font-semibold text-base">
                    {" "}
                    Profit
                  </h5>
                  <tr className="hover:bg-gray-100 hover:cursor-pointer">
                    <td className="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
                      {" "}
                      <strong>Total </strong>
                    </td>
                    <td className="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm">
                      <strong>{data?.profit.toFixed(3)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {loading && <Loader />}
        </div>
      </Card>
    </>
  );
};

export default IncomeStatement;

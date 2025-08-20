import { useGetPayrollQuery } from "@/redux/rtk/features/hrm/payroll/payrollApi";
import { getSetting } from "@/redux/rtk/features/setting/settingSlice";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { GoQuestion } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PayrollPrintPdf from "./PayrollPrintPdf";

const PayslipDetails = () => {
  const { data: companyDetails } = useSelector((state) => state?.setting);
  const dispatch = useDispatch();
  const { id } = useParams("id");
  const { data: paySlip } = useGetPayrollQuery(id);

  // useEffect(() => {
  //   dispatch(getSetting());
  // }, [dispatch]);

  return (
    <>
      <div className=" flex justify-end py-5">
        <PayrollPrintPdf
          data={paySlip}
          title={"Salary Statement"}
          type={"print"}
          btnName="Print PDF"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg p-8 w-full ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">{companyDetails?.companyName}</h1>
            <p className="text-sm">{companyDetails?.address}</p>
            <p className="text-sm">Phone: {companyDetails?.phone}</p>
            <p className="text-sm">Email: {companyDetails?.email}</p>
          </div>
          <div>
            {companyDetails?.logo ? (
              <img
                src={companyDetails?.logo}
                alt="Company Logo"
                className="w-12 h-12"
              />
            ) : (
              ""
            )}
          </div>
        </div>

        {/* <hr className="border-t border-gray-300 mb-6" /> */}

        {/* Payslip Title */}
        <h2 className="text-center text-lg font-semibold my-14">
          SALARY STATEMENT
        </h2>

        {/* Employee Details */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <p>
              <strong>Employee ID:</strong> {paySlip?.user?.employeeId}
            </p>
            <p>
              <strong>Name:</strong> {paySlip?.user?.firstName}{" "}
              {paySlip?.user?.lastName}
            </p>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <p>
              <strong>Department:</strong>{" "}
              {paySlip?.user?.department
                ? paySlip?.user?.department?.name
                : "No Department Assigned"}
            </p>

            <p>
              <strong>Designation:</strong>{" "}
              {paySlip?.user?.designation
                ? paySlip?.user?.designation?.name
                : "No Designation Assigned"}
            </p>
          </div>
          <div className="flex justify-between text-sm">
            <p>
              <strong>Joining Date:</strong>{" "}
              {dayjs(paySlip?.user?.joinDate).format("DD/ MM/ YYYY")}
            </p>
          </div>
        </div>

        <table className="table-auto w-full border-collapse border text-sm">
          <tbody className="w-full">
            <tr className="w-full">
              <td className="border px-4 py-2 flex items-center justify-between">
                <div>
                  {" "}
                  Payslip ID:{" "}
                  <span className="font-semibold"> {paySlip?.id}</span>
                </div>
                <div className="flex justify-end">
                  Month
                  <span className="font-semibold">
                    {`: ${dayjs()
                      .month(paySlip?.salaryMonth - 1)
                      .format("MMMM")}   `}
                  </span>
                </div>
                <div className="flex justify-start">
                  Year
                  <span className="font-semibold">
                    {` : ${paySlip?.salaryYear} `}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Earnings and Deductions */}
        <div>
          <table className="table-auto w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">EARNINGS</th>
                <th className="border px-4 py-2">AMOUNT</th>
                <th className="border px-4 py-2">DEDUCTIONS</th>
                <th className="border px-4 py-2">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Salary</td>
                <td className="border px-4 py-2 text-right">
                  {paySlip?.salary.toFixed(2)}
                </td>
                <td className="border px-4 py-2">Deductions</td>
                <td className="border px-4 py-2 text-right">
                  {paySlip?.deduction?.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Bonus</td>
                <td className="border px-4 py-2 text-right">
                  {paySlip?.bonus?.toFixed(2)}
                </td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
              </tr>
              <tr className="font-bold bg-gray-100">
                <td className="border px-4 py-2">Gross Earnings</td>
                <td className="border px-4 py-2 text-right">
                  {(paySlip?.salary + paySlip?.bonus).toFixed(2)}
                </td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <table className="table-auto w-full border-collapse border border-t-0 text-sm">
          <tbody className="w-full">
            <tr className="w-full">
              <td className="border px-4 py-2 flex items-center justify-end gap-2">
                <Tooltip title="Net Salary = (Gross Earnings - Deductions ) ">
                  <GoQuestion size={18} />
                </Tooltip>
                <div className="text-center text-lg font-bold">
                  NET SALARY : {paySlip?.totalPayable?.toFixed(2)}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <hr className="border-t border-gray-300 mb-6" />

        {/* Net Salary */}

        <p className="text-center text-sm text-gray-600"></p>
      </div>
    </>
  );
};

export default PayslipDetails;

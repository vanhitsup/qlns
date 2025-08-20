import React, { useState, useEffect } from "react";
import { Checkbox, InputNumber, Input, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePayslip } from "@/redux/rtk/features/hrm/payroll/payrollSlice";
import Button from "@/UI/Button";
import Card from "@/UI/Card";
import {
  useAddPayrollMutation,
  useGetPayslipsQuery,
} from "@/redux/rtk/features/hrm/payroll/payrollApi";
import dayjs from "dayjs";
import TableComponent from "@/components/CommonUi/TableComponent";
import PayrollTableComponent from "./PayrollTableComponent";

const CalculatePayroll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageConfig, setPageConfig] = useState({
    salaryMonth: dayjs().format("M"),
    salaryYear: dayjs().format("YYYY"),
  });
  const [selectedPayslipIds, setSelectedPayslipIds] = useState([]);
  const [payslips, setPayslips] = useState([]);
  const { isLoading } = useGetPayslipsQuery(pageConfig);
  const [addPayslip, { isLoading: addLoading }] = useAddPayrollMutation();
  const list = useSelector((state) => state.payroll.list);

  useEffect(() => {
    setPayslips(list);
  }, [list]);

  const onMonthChange = (date, dateString) => {
    setPageConfig((prev) => ({
      ...prev,
      salaryMonth: dateString,
    }));
  };

  const onYearChange = (date, dateString) => {
    setPageConfig((prev) => ({
      ...prev,
      salaryYear: dateString,
    }));
  };

  const [selectedRowKeys, setSelectedRow] = useState([]);
  const onRowSelect = (row) => {
    setSelectedRow(row);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Name",
      key: "name",
      render: (record) => `${record.firstName} ${record.lastName}`,
      renderCsv: (record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Salary Payable",
      dataIndex: "salaryPayable",
      key: "salaryPayable",
      render: (salaryPayable, { userId }) => (
        <InputNumber
          size={"small"}
          style={{ width: "150px", fontSize: "15px" }}
          onChange={(value) => {
            dispatch(updatePayslip({ userId, value, key: "salaryPayable" }));
          }}
          value={salaryPayable}
          min={0}
        />
      ),
      csvOff: true,
    },
    {
      title: "Bonus",
      dataIndex: "bonus",
      key: "bonus",
      render: (bonus, { userId }) => (
        <InputNumber
          size={"small"}
          style={{ width: "100px", fontSize: "15px" }}
          onChange={(value) => {
            dispatch(updatePayslip({ userId, value, key: "bonus" }));
          }}
          value={bonus}
          min={0}
        />
      ),
      csvOff: true,
    },
    {
      title: "B-Comment",
      dataIndex: "bonusComment",
      key: "bonusComment",
      render: (bonusComment, { userId }) => (
        <Input
          placeholder="comment"
          size={"small"}
          style={{ width: "100px", fontSize: "15px" }}
          onChange={(e) => {
            dispatch(
              updatePayslip({
                userId,
                value: e.target.value,
                key: "bonusComment",
              })
            );
          }}
          value={bonusComment}
        />
      ),
      csvOff: true,
    },
    {
      title: "Deduction",
      dataIndex: "deduction",
      key: "deduction",
      render: (deduction, { userId }) => (
        <InputNumber
          size={"small"}
          style={{ width: "100px", fontSize: "15px" }}
          onChange={(value) => {
            dispatch(updatePayslip({ userId, value, key: "deduction" }));
          }}
          value={deduction}
          min={0}
        />
      ),
      csvOff: true,
    },
    {
      title: "D-Comment",
      dataIndex: "deductionComment",
      key: "deductionComment",
      render: (deductionComment, { userId }) => (
        <Input
          placeholder="comment"
          size={"small"}
          style={{ width: "100px", fontSize: "15px" }}
          onChange={(e) => {
            dispatch(
              updatePayslip({
                userId,
                value: e.target.value,
                key: "deductionComment",
              })
            );
          }}
          value={deductionComment}
        />
      ),
      csvOff: true,
    },
    {
      title: "Working Hours",
      dataIndex: "workingHour",
      key: "workingHour",
      render: (workingHour) => `${workingHour?.toFixed(2)} hours`,
    },
    {
      title: "Total Payable",
      dataIndex: "totalPayable",
      key: "totalPayable",
    },
  ];

  const OnSubmit = async () => {
    if (selectedRowKeys.length === 0) {
      alert("Please select at least one payslip to generate.");
      return;
    }

    const selectedPayslipData = payslips.filter(
      (payslip) => selectedRowKeys.includes(payslip.userId) // Only include the payslips with IDs in selectedRowKeys
    );

    try {
      const resp = await addPayslip({
        values: selectedPayslipData,
        month: pageConfig.salaryMonth,
        year: pageConfig.salaryYear,
      });

      if (resp) {
        navigate("/admin/payslip");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card>
        <div className="flex gap-3">
          <h1 className="text-base text-color-2 items-center">
            Select Month :
          </h1>
          <DatePicker
            format={"M"}
            style={{ maxWidth: "200px" }}
            picker="month"
            defaultValue={dayjs()}
            onChange={onMonthChange}
          />
          <h1 className="text-base text-color-2 items-center">Select Year :</h1>
          <DatePicker
            format={"YYYY"}
            picker="year"
            style={{ maxWidth: "200px" }}
            onChange={onYearChange}
            defaultValue={dayjs()}
          />
        </div>
        <PayrollTableComponent
          columns={columns}
          list={payslips}
          loading={isLoading}
          setPageConfig={setPageConfig}
          title={"Calculate Payroll"}
          onRowSelect={onRowSelect}
          selectedRowKeys={selectedRowKeys}
          selectedRowKey={"userId"}
        />
        <div className="flex justify-end">
          {/* <Button
            loading={isLoading || addLoading}
            type="primary"
            size="large"
            htmlType="submit"
            onClick={OnSubmit}
            className="mt-5 w-[400px] bg-blue-400 text-white text-end">
            Generate Payslip
          </Button> */}
          <Button
            loading={isLoading || addLoading}
            type="primary"
            size="large"
            htmlType="submit"
            onClick={OnSubmit}
            className="mt-5 w-[400px] bg-blue-400 text-white text-end">
            Generate Payslip
          </Button>
        </div>
      </Card>
    </>
  );
};

export default CalculatePayroll;

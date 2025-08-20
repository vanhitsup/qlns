import ViewBtn from "@/components/Buttons/ViewBtn";
import TableComponent from "@/components/CommonUi/TableComponent";
import UserPrivateComponent from "@/components/PrivacyComponent/UserPrivateComponent";
import { useAddPaymentMutation } from "@/redux/rtk/features/hrm/payment/paymentApi";
import { useGetPayslipForPaymentMonthWiseQuery } from "@/redux/rtk/features/hrm/payroll/payrollApi";
import Button from "@/UI/Button";
import Card from "@/UI/Card";
import Modal from "@/UI/Modal";
import { DollarCircleFilled, EyeFilled } from "@ant-design/icons";
import { DatePicker, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { MdPayments } from "react-icons/md";
import { Link } from "react-router-dom";
import AddPayrollPayment from "./AddPayrollPayment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadAllStaff } from "@/redux/rtk/features/hrm/user/userSlice";

const PayslipList = () => {
  const dispatch = useDispatch();
  const [pageConfig, setPageConfig] = useState({ page: 1, count: 10 });
  const { data: payroll, isLoading } =
    useGetPayslipForPaymentMonthWiseQuery(pageConfig);
  const { list, total, loading } = useSelector((state) => state.users);
  const onMonthChange = (date, dateString) => {
    setPageConfig((prev) => {
      return { ...prev, value: "monthWise", salaryMonth: dateString };
    });
  };

  const onYearChange = (date, dateString) => {
    setPageConfig((prev) => {
      return { ...prev, value: "monthWise", salaryYear: dateString };
    });
  };
  const [edit, setEdit] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "user",
      render: (user) => `${user?.firstName} ${user?.lastName}`,
      renderCsv: (user) => `${user?.firstName} ${user?.lastName}`,
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
    },
    {
      title: "Month ",
      key: "month",
      render: ({ salaryMonth }) => `${salaryMonth}`,
      renderCsv: ({ salaryMonth }) => `${salaryMonth}`,
    },
    {
      title: "Year",
      key: "year",
      render: ({ salaryYear }) => `${salaryYear}`,
      renderCsv: ({ salaryYear }) => `${salaryYear}`,
    },

    {
      title: "bonus",
      dataIndex: "bonus",
      key: "bonus",
    },

    {
      title: "Bonus Comment",
      dataIndex: "bonusComment",
      key: "bonusComment",
    },

    {
      title: "deduction",
      dataIndex: "deduction",
      key: "deduction",
    },

    {
      title: "Deduction Comment",
      dataIndex: "deductionComment",
      key: "deductionComment",
    },

    {
      title: "Total",
      dataIndex: "totalPayable",
      key: "totalPayable",
    },
    {
      title: "Total Paid Amount",
      dataIndex: "totalPaidAmount",
      key: "totalPaidAmount",
    },
    {
      title: "Total Due Amount",
      dataIndex: "totalDueAmount",
      key: "totalDueAmount",
    },

    {
      title: "W Hours",
      dataIndex: "workingHour",
      key: "workingHour",
      render: (workingHour) => `${workingHour?.toFixed(2)} hours`,
      renderCsv: (workingHour) => `${workingHour?.toFixed(2)} hours`,
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      render: (paymentStatus) => (
        <Tag
          color={
            paymentStatus === "DUE"
              ? "orange"
              : paymentStatus === "PAID"
              ? "green"
              : "red"
          }>
          {paymentStatus}
        </Tag>
      ),
      key: "paymentStatus",
    },

    {
      id: 4,
      title: "",
      key: "action",
      render: (payment) => [
        {
          label: (
            <ViewBtn title={"View"} path={`/admin/payslip/${payment?.id}`} />
          ),
          key: "view",
        },
        {
          label: (
            <>
              <span
                onClick={() => {
                  setEdit(payment);
                }}>
                <button
                  className="flex items-center gap-2 rounded disabled:cursor-not-allowed disabled:opacity-50 px-2 py-1"
                  disabled={payment?.paymentStatus === "PAID"}>
                  <MdPayments className="text-[1rem]" />
                  Make a payment
                </button>
              </span>
            </>
          ),
          key: "view",
        },
      ],
      csvOff: true,
    },
  ];

  const filters = [
    {
      key: "paymentStatus",
      label: "Status",
      type: "select",
      options: [
        { label: "Paid", value: "PAID" },
        { label: "Unpaid", value: "UNPAID" },
        { label: "Due", value: "DUE" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "userId",
      label: "Name",
      type: "select",
      options: list?.map((user) => ({
        label: `${user?.firstName} ${user?.lastName}`,
        value: user?.id,
      })),
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  useEffect(() => {
    dispatch(
      loadAllStaff({
        page: 1,
        count: 10,
        status: "true",
      })
    );
  }, [dispatch]);

  return (
    <>
      <Card>
        <div className="flex gap-3">
          <h1 className="text-base text-color-2 items-center">
            {" "}
            Select Month :{" "}
          </h1>
          <DatePicker
            format={"M"}
            style={{ maxWidth: "200px" }}
            picker="month"
            onChange={onMonthChange}
          />
          <h1 className="text-base text-color-2 items-center">
            {" "}
            Select Year :{" "}
          </h1>
          <DatePicker
            format={"YYYY"}
            picker="year"
            style={{ maxWidth: "200px" }}
            onChange={onYearChange}
          />
        </div>
        <TableComponent
          columns={columns}
          list={payroll?.getAllPayslip}
          total={payroll?.totalPayslip}
          filters={filters}
          loading={isLoading}
          setPageConfig={setPageConfig}
          title={"Calculate Payroll"}
        />
      </Card>
      <Modal
        outsideClick={true}
        open={edit}
        title={"Make Payment"}
        onClose={() => setEdit(false)}>
        <AddPayrollPayment data={edit} />
      </Modal>
    </>
  );
};

export default PayslipList;

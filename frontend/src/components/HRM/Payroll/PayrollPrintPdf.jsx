import moment from "moment";

import useSettings from "@/Hooks/useSettings";
import payrollPdfGenerator from "./payrollPdfGenerator";
import dayjs from "dayjs";

export default function PayrollPrintPdf({ data, title, type, btnName }) {
  const pdfData = data?.invoiceItems;
  const companyInfo = useSettings();
  // const { data: invoiceSetting, isLoading } = useGetInvoiceSettingQuery();
  const tableHead = ["Earnings", "Amount", "Deductions", "Amount"];
  const topBody = [
    `Payslip Id: ${data?.id}`,
    `Month: ${dayjs()
      .month(data?.salaryMonth - 1)
      .format("MMMM")}`,
    `Year: ${data?.salaryYear} `,
  ];
  const bottomBody = [`NET SALARY: ${data?.totalPayable.toFixed(2)}`];

  const tableBody = [
    [
      "Salary",
      `${data?.salary.toFixed(2)}`,
      "Deductions",
      `${data?.deduction.toFixed(2)}`,
    ],
    ["Bonus", `${data?.bonus.toFixed(2)}`],
  ];

  tableBody.push([
    "Gross Earnings",
    `${(data?.salary + data?.bonus).toFixed(2)}`,
  ]);
  const topRightInfo = [
    {
      value: `Employee Id: ${data?.user?.employeeId}`,
    },
    {
      value: `Department: ${
        data?.user?.department
          ? data?.user?.department?.name
          : "No Department Assigned"
      }`,
    },
    {
      value: `Joining Date: ${dayjs(data?.user?.joinDate).format(
        "DD/ MM/ YYYY"
      )}`,
    },
  ];
  const middleRightInfo = [
    {
      value: `Name: ${data?.user?.firstName} ${data?.user?.lastName}`,
    },
    {
      value: `Designation: ${
        data?.user?.designation
          ? data?.user?.designation?.name
          : "No Designation Assigned"
      }`,
    },
  ];

  const settings = {
    jsPDF: {
      // orientation: "landscape",
    },
    tableFontSize: 9,
    infoTopFontSize: 12,
    bottomRightFontSize: 10,
    bottomLeftFontSize: 11,
    footerFontSize: 10,
  };

  const bottomRightContent = [
    {
      label: "Subtotal",
      value: data?.subTotal ? data?.subTotal : "",
    },
    {
      label: "Total Tax ",
      value: data?.totalTax ? data?.totalTax : "",
    },

    {
      label: "Total",
      value: data?.totalAmount ? data?.totalAmount : "",
      style: { borderTop: true, bold: true },
    },
  ];

  if (data?.paymentTransaction && data.paymentTransaction.length > 0) {
    data?.paymentTransaction?.forEach((item) => {
      bottomRightContent.push({
        label: `Payment - ${moment(item?.date).format("MMM DD YYYY")}`,
        value: Number(item?.creditAmount).toFixed(2),
        style: { bold: false },
      });
    });
  }

  if (data?.due !== undefined && data?.due !== null) {
    bottomRightContent.push({
      label: "Amount Due",
      value: Number(data?.due).toFixed(2),
      style: { borderTop: true, bold: true, final: true },
    });
  }

  const customerInfo = [];
  const bottomLeftContent = [
    {
      value: `Due Date: ${moment(data?.dueDate).format("YYYY-MM-DD")}`,
    },
    {
      // value: `${invoiceSetting?.invoiceAndStatementTerms}`,
    },
  ];

  const companyInfoArray = [
    {
      // value: invoiceSetting?.contactDetails,
    },
    {
      value: companyInfo?.address,
    },
  ];

  const topLeftContent = [
    {
      value: "Salary Statement",
      style: { fontSize: 20, bold: true, marginBottom: 2 },
    },
    {
      value: data?.customer ? data?.customer?.username : "",
      style: { fontSize: 13, marginLeft: 5 },
    },
  ];
  return (
    <button
      // disabled={isLoading}
      onClick={async () => {
        const img = new Image();
        img.src = `${import.meta.env.VITE_APP_API}/view/${companyInfo?.logo}`;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          payrollPdfGenerator(type, {
            tableHead,
            tableBody,
            topRightInfo,
            settings,
            title,
            data,
            bottomRightContent,
            customerInfo,
            bottomLeftContent,
            companyInfo,
            companyInfoArray,
            topLeftContent,
            topBody,
            bottomBody,
            middleRightInfo,
            logo: {
              img: img,
              width: img.naturalWidth,
              height: img.naturalHeight,
            },
          });
        };
        img.onerror = (err) => {
          payrollPdfGenerator(type, {
            tableHead,
            tableBody,
            topRightInfo,
            settings,
            title,
            bottomRightContent,
            customerInfo,
            bottomLeftContent,
            companyInfo,
            middleRightInfo,
            data,
            topBody,
            bottomBody,
            companyInfoArray,
            topLeftContent,
          });
        };
      }}
      className="font-semibold px-4 py-1 rounded border text-primary hover:text-[#4800ff] bg-[#fafafa] hover:shadow-inner hover:bg-[#f7f5f5ee] ">
      {btnName}
    </button>
  );
}

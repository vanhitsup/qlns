import Button from "@/UI/Button";
import invoiceGenerator from "@/utils/invoiceGenerator";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { useSelector } from "react-redux";

export default function CustomerReportPrint({
  data,
  info,
  title,
  type,
  btnName,
}) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;

  const bottomLeftContent = [];
  const bottomRightContent = [
    {
      label: "Total",
      value: `${info?.grandTotalAmount ? info.grandTotalAmount.toFixed(2) : 0}`,
    },
    {
      label: "Paid",
      value: `${
        info?.grandTotalPaidAmount ? info.grandTotalPaidAmount.toFixed(2) : 0
      }`,
    },
    {
      label: "Due",
      value: `${info?.grandDueAmount ? info.grandDueAmount.toFixed(2) : 0}`,
    },
    {
      label: "Return",
      value: `${
        info?.grandTotalReturnAmount
          ? info.grandTotalReturnAmount.toFixed(2)
          : 0
      }`,
    },
    {
      label: "Instant Paid Return",
      value: `${
        info?.grandInstantPaidReturnAmount
          ? info.grandInstantPaidReturnAmount.toFixed(2)
          : 0
      }`,
    },
  ];
  const tableHead = [
    "SL",
    "Date",
    "Name",
    "Email",
    "Phone",
    "Address",
    "Total ",
    "Paid",
    "Due",
    "Return",
  ];
  const tableBody = data.map((item, index) => [
    `${index + 1}`,
    moment(item.createdAt).format("YYYY-MM-DD"),

    item.username,
    item.email,
    item.phone,
    item.address,

    `${item.totalAmount ? item.totalAmount.toFixed(2) : 0}`,
    `${item.totalPaidAmount ? item.totalPaidAmount.toFixed(2) : 0}`,
    `${item.dueAmount ? item.dueAmount.toFixed(2) : 0}`,
    `${item.totalReturnAmount ? item.totalReturnAmount.toFixed(2) : 0}`,
  ]);

  const customerInfo = [];
  const TopRightInfo = [
    {
      value: `Report Date: ${moment().format("YYYY-MM-DD")}`,
    },
    {
      value: `Currency: ${currencyName}`,
    },
  ];
  const settings = {
    jsPDF: {
      orientation: "landscape",
    },
    tableFontSize: 10,
    infoTopFontSize: 8,
    bottomRightFontSize: 10,
    bottomLeftFontSize: 8,
    footerFontSize: 10,
  };
  return (
    <div className='flex gap-2'>
      <Button
        className='bg-primary flex justify-center items-center px-4 py-2 text-white rounded'
        onClick={() =>
          invoiceGenerator(type, {
            title,
            TopRightInfo,
            companyInfo,
            customerInfo,
            bottomLeftContent,
            bottomRightContent,
            tableBody,
            tableHead,
            settings,
          })
        }
      >
        {btnName}
      </Button>
    </div>
  );
}

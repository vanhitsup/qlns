import Button from "@/UI/Button";
import invoiceGenerator from "@/utils/invoiceGenerator";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { useSelector } from "react-redux";

export default function PurchaseReportPrint({
  data,
  pageConfig,
  supplier,
  title,
  info,
  type,
  btnName,
}) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;

  const bottomLeftContent = [];

  const bottomRightContent = [
    {
      label: "Total",
      value: `${info?.totalAmount ? info.totalAmount.toFixed(2) : 0}`,
    },
    {
      label: "Paid",
      value: `${info?.paidAmount ? info.paidAmount.toFixed(2) : 0}`,
    },
    {
      label: "Due",
      value: `${info?.dueAmount ? info.dueAmount.toFixed(2) : 0}`,
    },

    {
      label: "Return",
      value: `${
        info?.totalReturnAmount ? info.totalReturnAmount.toFixed(2) : 0
      }`,
    },
    {
      label: "Instant Paid Return ",
      value: `${
        info?.instantPaidReturnAmount
          ? info.instantPaidReturnAmount.toFixed(2)
          : 0
      }`,
    },
  ];
  const tableHead = [
    "SL",
    "Date",
    "Invoice",
    "Supplier",
    "Product ",
    "QTY",
    "Total",
    "Paid",
    "Due",
    "Return",
  ];
  const tableBody = data.map((item, index) => [
    `${index + 1}`,
    moment(item.date).format("YYYY-MM-DD"),
    item.id,
    item.supplier?.name,
    item?.purchaseInvoiceProduct
      ?.map((product) => product?.product?.name)
      .join(",\n"),
    item?.purchaseInvoiceProduct
      ?.map((product) => product?.productQuantity)
      .join("\n"),
    `${item.totalAmount ? item.totalAmount : 0}`,
    `${item.paidAmount ? item.paidAmount : 0}`,
    `${item.dueAmount ? item.dueAmount : 0}`,
    `${item.returnAmount ? item.returnAmount : 0}`,
  ]);

  const customerInfo = [
    {
      value: `Supplier: ${supplier ? supplier : "All"}`,
      style: {
        bold: true,
        fontSize: 12,
      },
    },
  ];
  const TopRightInfo = [
    {
      value: `From Date: ${moment(pageConfig?.startDate).format("YYYY-MM-DD")}`,
    },
    {
      value: `To Date: ${moment(pageConfig?.endDate).format("YYYY-MM-DD")}`,
    },
    {
      value: `Currency: ${currencyName}`,
    },
  ];
  const settings = {
    jsPDF: {
      orientation: "landscape",
    },
    tableFontSize: 8,
    infoTopFontSize: 10,
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

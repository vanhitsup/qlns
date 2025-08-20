import Button from "@/UI/Button";
import invoiceGenerator from "@/utils/invoiceGenerator";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { useSelector } from "react-redux";

export default function SaleReportPrint({
  data,
  info,
  saleInfo,
  pageConfig,
  title,
  type,
  btnName,
}) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;

  const bottomLeftContent = [];

  const bottomRightContent = [
    {
      label: "Total Unit Quantity",
      value: `${info?.totalUnitQuantity ? info.totalUnitQuantity : 0}`,
    },
    {
      label: "Total  Amount",
      value: `${info?.totalAmount ? info.totalAmount.toFixed(2) : 0}`,
    },
    {
      label: "Total Due",
      value: `${info?.dueAmount ? info.dueAmount.toFixed(2) : 0}`,
    },
    {
      label: "Total Paid",
      value: `${info?.paidAmount ? info.paidAmount.toFixed(2) : 0}`,
    },
    {
      label: "Total Return",
      value: `${
        info?.totalReturnAmount ? info.totalReturnAmount.toFixed(2) : 0
      }`,
    },
    {
      label: "Total Instant Paid Return",
      value: `${
        info?.instantPaidReturnAmount
          ? info.instantPaidReturnAmount.toFixed(2)
          : 0
      }`,
    },
    {
      label: "Total Profit",
      value: `${info?.profit ? info.profit.toFixed(2) : 0}`,
    },
  ];
  const tableHead = [
    "SL",
    "Date",
    "Invoice",
    "Staff",
    "Product ",
    "QTY",
    "Total",
    "Discount",
    "Vat",
    "Grand Total",
    "Paid",
    "Due",
    "Return",
    "Profit",
  ];
  const tableBody = data.map((item, index) => [
    `${index + 1}`,
    moment(item.date).format("YYYY-MM-DD"),
    item?.id,
    item?.user?.username,
    item.saleInvoiceProduct
      .map((product) => (product?.product?.name ? product?.product?.name : ""))
      .join(",\n"),
    item?.saleInvoiceProduct
      .map((product) => product?.productQuantity)
      .join("\n"),
    `${item.totalAmount ? item.totalAmount.toFixed(2) : 0}`,
    `${item.totalDiscountAmount ? item.totalDiscountAmount.toFixed(2) : 0}`,
    `${item.totalTaxAmount ? item.totalTaxAmount.toFixed(2) : 0}`,
    `${
      item.totalAmount
        ? item.totalAmount + item.totalTaxAmount - item.totalDiscountAmount
        : 0
    }`,
    `${item.paidAmount ? item.paidAmount.toFixed(2) : 0}`,
    `${item.dueAmount ? item.dueAmount.toFixed(2) : 0}`,
    `${item.returnAmount ? item.returnAmount.toFixed(2) : 0}`,
    `${item.profit ? item.profit.toFixed(2) : 0}`,
  ]);

  const customerInfo = [
    {
      value: `Customer: ${saleInfo?.customer ? saleInfo?.customer : "All"}`,
    },
    {
      value: `Sale Person: ${
        saleInfo?.salePerson ? saleInfo?.salePerson : "All"
      }`,
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
    infoTopFontSize: 8,
    bottomRightFontSize: 10,
    bottomLeftFontSize: 8,
    footerFontSize: 10,
  };
  return (
    <div className='flex gap-2'>
      <Button
        className='bg-primary flex  justify-center items-center px-4 py-2 text-white rounded'
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

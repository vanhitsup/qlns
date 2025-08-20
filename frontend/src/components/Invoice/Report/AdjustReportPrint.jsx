import Button from "@/UI/Button";
import invoiceGenerator from "@/utils/invoiceGenerator";
import useCurrency from "@/utils/useCurrency";
import { useSelector } from "react-redux";

export default function AdjustReportPrint({ data, title, type, btnName }) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;

  const bottomLeftContent = [];

  const bottomRightContent = [
    {
      label: "Total Increment Quantity",
      value: `${
        data?.totalGrandIncrementQuantity
          ? data.totalGrandIncrementQuantity.toFixed(2)
          : 0
      }`,
    },
    {
      label: "Total Increment Price",
      value: `${
        data?.totalGrandIncrementPrice
          ? data.totalGrandIncrementPrice.toFixed(2)
          : 0
      }`,
    },
    {
      label: "Total Decrement Quantity",
      value: `${
        data?.totalGrandDecrementQuantity
          ? data.totalGrandDecrementQuantity.toFixed(2)
          : 0
      }`,
    },
    {
      label: "Total Decrement Price",
      value: `${
        data?.totalGrandDecrementPrice
          ? data.totalGrandDecrementPrice.toFixed(2)
          : 0
      }`,
    },
  ];
  const tableHead = [
    "SL",
    "Adjust Id",
    "Product",
    "Adjust Quantity",
    "Adjust Type",
    "Adjust Price",
  ];
  const tableBody = data?.allAdjustInvoice?.map((item, index) => [
    `${index + 1}`,
    item?.adjustInvoiceProduct
      ?.map((product) => product?.adjustInvoiceId)
      .join("\n"),
    item?.adjustInvoiceProduct
      ?.map((product) => product?.product.name)
      .join("\n"),
    item?.adjustInvoiceProduct
      ?.map((product) => product?.adjustQuantity)
      .join("\n"),
    item?.adjustType,
    item?.totalAdjustPrice,
  ]);

  const customerInfo = [
    // {
    //   value: `Supplier: ${supplier ? supplier : "All"}`,
    //   style: {
    //     bold: true,
    //     fontSize: 12,
    //   },
    // },
  ];
  const TopRightInfo = [
    // {
    //   value: `From Date: ${moment(pageConfig?.startDate).format("YYYY-MM-DD")}`,
    // },
    // {
    //   value: `To Date: ${moment(pageConfig?.endDate).format("YYYY-MM-DD")}`,
    // },
    // {
    //   value: `Currency: ${currencyName}`,
    // },
  ];
  const settings = {
    jsPDF: {
      // orientation: "landscape"
    },
    tableFontSize: 8,
    dataTopFontSize: 10,
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
            rightColumnLevelPosition: 10,
          })
        }
      >
        {btnName}
      </Button>
    </div>
  );
}

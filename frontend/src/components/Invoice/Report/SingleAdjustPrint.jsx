
import Button from "@/UI/Button";
import invoiceGenerator from "@/utils/invoiceGenerator";
import numberToWords from "@/utils/numberToWords";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

export default function SingleAdjustPrint({
  data,
  title,
  type,
  btnName,
}) {
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const dispatch = useDispatch();
  const numberInText = numberToWords(Math.round(data?.totalAdjustPrice));

  const bottomLeftContent = [
    {
      label: "IN WORDS: ",
      value: `${numberInText.toUpperCase()} ${currencyName}` || "",
    },
    { label: "Notes: ", value: data?.note ? data?.note : "" },
  ];

  const bottomRightContent = [
    {
      label: "Total Increment Quantity",
      value: `${
        data?.totalIncrementQuantity
          ? data.totalIncrementQuantity
          : 0
      }`,
    },
    {
      label: "Total Increment Price",
      value: `${
        data?.totalIncrementPrice
          ? data.totalIncrementPrice.toFixed(2)
          : 0
      }`,
    },
    {
      label: "Total Decrement Quantity",
      value: `${
        data?.totalDecrementQuantity
          ? data.totalDecrementQuantity
          : 0
      }`,
    },
    {
      label: "Total Decrement Price",
      value: `${
        data?.totalDecrementPrice
          ? data.totalDecrementPrice.toFixed(2)
          : 0
      }`,
    },
  ];
  const tableHead = [
    "SL",
    "Adjust Id",
    "Product",
    "Adjust Quantity",
    "Adjust Price",
    "Date",
  ];
  const tableBody = data?.adjustInvoiceProduct?.map((item, index) => [
    `${index + 1}`,
    item?.adjustInvoiceId,
    item?.product.name,
    item?.adjustQuantity,
    item?.product.productPurchasePrice,
    moment(item?.product.createdAt).format("ll"),
  ]);

  const customerInfo = [
    {
      value: `Adjust By: ${data.user && data.user.username}`,
   
    },
    {
      value: `Adjust Type: ${data.adjustType && data.adjustType}`,
    
    },
  ];
  const TopRightInfo = [
    {
      value: `Adjust Date: ${moment(data?.createdAt).format("ll")}`,
    },
    {
      value: `Invoice Id:${data?.id} `,
    },
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
    <div className="flex gap-2">
      <Button
        className="bg-primary flex justify-center items-center px-4 py-2 text-white rounded"
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
            leftBottomSecondColunmX: 34,
            rightColumnLevelPosition: 10,
          })
        }
      >
        {btnName}
      </Button>
    </div>
  );
}

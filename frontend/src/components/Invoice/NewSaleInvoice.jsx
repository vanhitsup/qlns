import Button from "@/UI/Button";
import invoiceGenerator from "@/utils/invoiceGenerator";
import numberToWords from "@/utils/numberToWords";
import useCurrency from "@/utils/useCurrency";
import "jspdf-autotable";
import moment from "moment";
import { useSelector } from "react-redux";

export default function NewSaleInvoice({ sale, title }) {
  const { singleSaleInvoice: data } = sale || {};
  const { currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const numberInText = numberToWords(
    Math.round(data.totalAmount + data?.totalTaxAmount)
  );

  const grandTotal = Number(
    (sale.totalAmount || 0) +
      (sale.totalTaxAmount || 0) +
      (sale.instantPaidReturnAmount || 0) -
      (sale.totalReturnAmount || 0)
  );

  const bottomLeftContent = [
    {
      label: "GRAND TOTAL IN WORDS: ",
      value: `${numberInText.toUpperCase()} ${currencyName}` || "",
    },

    { label: "Notes: ", value: data.note ? data.note : "" },
    {
      label: "Terms And Conditions: ",
      value: data.termsAndConditions ? data.termsAndConditions : "",
    },
  ];

  const bottomRightContent = [
    {
      label: "Total Amount:",
      value: `${
        data?.totalAmount
          ? Number(data.totalAmount + (data?.totalDiscountAmount || 0)).toFixed(
              2
            )
          : 0
      }`,
    },
    {
      label: "Discount (-)",
      value: `${
        data?.totalDiscountAmount
          ? Number(data.totalDiscountAmount).toFixed(2)
          : 0
      }`,
    },
    {
      label: "Total Tax (+)",
      value: `${
        data?.totalTaxAmount ? Number(data.totalTaxAmount).toFixed(2) : 0
      }`,
    },

    sale.totalReturnAmount && {
      label: "Return product value (-):",
      value: `${
        sale.totalReturnAmount ? Number(sale.totalReturnAmount).toFixed(2) : 0
      }`,
    },
    sale.instantPaidReturnAmount && {
      label: "Return Amount (+):",
      value: `${
        sale.instantPaidReturnAmount
          ? Number(sale.instantPaidReturnAmount).toFixed(2)
          : 0
      }`,
    },
    {
      label: "Grand Total:",
      value: `${sale.totalAmount ? grandTotal.toFixed(2) : 0}`,
      style: { borderTop: true },
    },
    {
      label: "Paid Amount (-)",
      value: `${
        sale.totalPaidAmount ? Number(sale.totalPaidAmount).toFixed(2) : 0
      }`,
    },

    {
      label: "Due Amount:",
      value: `${sale.dueAmount.toFixed(2)}`,
      style: { borderTop: true },
    },
  ];
  const tableHead = [
    "SL",
    "Name",
    "Quantity",
    "Price",
    "Discount",
    "Amount",
    "Tax",
  ];
  const tableBody = data.saleInvoiceProduct.map((item, index) => [
    index + 1,
    item.product.name,
    item.productQuantity,
    `${item.productUnitSalePrice}`,
    `${item.productDiscount || 0}`,
    `${item.productFinalAmount}`,
    `${item.taxAmount}`,
  ]);

  const customerInfo = [
    {
      value: `Client Name: ${data?.customer?.username}`,
    },
    {
      value: `Address: ${
        data?.customer?.address ? data?.customer?.address : ""
      }`,
    },
    {
      value: `Contact No: ${data?.customer?.phone}`,
    },
  ];
  const TopRightInfo = [
    {
      value: ` Invoice No: ${data?.id}`,
    },
    {
      value: `Invoice Date: ${moment(data?.date).format("YYYY-MM-DD")}`,
    },
    {
      value: `Currency: ${currencyName}`,
    },
  ];
  if (data?.dueDate) {
    TopRightInfo.splice(2, 0, {
      value: `Due Date: ${moment(data?.dueDate).format("YYYY-MM-DD")}`,
    });
  }
  const settings = {
    jsPDF: {
      // orientation: "landscape"
    },
    tableFontSize: 10,
    infoTopFontSize: 10,
    bottomRightFontSize: 10,
    bottomLeftFontSize: 8,
    footerFontSize: 10,
  };
  return (
    <div className='flex gap-2'>
      <Button
        color='primary'
        onClick={() =>
          invoiceGenerator("print", {
            title,
            TopRightInfo,
            companyInfo,
            customerInfo,
            bottomLeftContent,
            bottomRightContent,
            tableBody,
            tableHead,
            settings,
            leftBottomSecondColumnX: 55,
          })
        }
      >
        Print
      </Button>
    </div>
  );
}

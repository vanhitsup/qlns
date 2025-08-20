import moment from "moment";
import invoiceGenerator from "./invoiceGenerator";
import numberToWords from "./numberToWords";

export default function stockTransferPDF(
  data,
  companyInfo,
  title,
  currencyName
) {
  const {
    id,
    date,
    note,
    totalPurchaseAmount,
    stockTransferProduct,
    storeFrom,
    storeTo,
  } = data || {};
  const numberInText = numberToWords(Math.round(totalPurchaseAmount));

  const bottomLeftContent = [
    {
      label: "GRAND TOTAL IN WORDS: ",
      value: `${numberInText.toUpperCase()} ${currencyName}` || "",
    },

    { label: "Notes: ", value: note ? note : "" },
  ];

  const bottomRightContent = [
    {
      label: "Total Transfer Amount:",
      value: `${
        totalPurchaseAmount ? Number(totalPurchaseAmount).toFixed(2) : 0
      }`,
    },
  ];
  const tableHead = ["SL", "Name", "Purchase price", "Quantity", "Amount"];
  const tableBody = stockTransferProduct.map((item, index) => [
    index + 1,
    item.product.name,
    `${item.productUnitPurchasePrice}`,
    item.productQuantity,
    `${item.productFinalAmount}`,
  ]);

  const customerInfo = [
    {
      value: `Transfer From: ${storeFrom.name || "N/A"}`,
    },
    {
      value: `Transfer To: ${storeTo.name || "N/A"}`,
    },
  ];
  const TopRightInfo = [
    {
      value: ` Invoice No: ${id}`,
    },
    {
      value: `Invoice Date: ${moment(date).format("YYYY-MM-DD")}`,
    },
    {
      value: `Currency: ${currencyName}`,
    },
  ];
  const settings = {
    jsPDF: {
      // orientation: "landscape"
    },
    tableFontSize: 10,
    infoTopFontSize: 10,
    bottomRightFontSize: 10,
    bottomLeftFontSize: 7,
    footerFontSize: 10,
  };

  return invoiceGenerator(null, {
    title,
    TopRightInfo,
    customerInfo,
    companyInfo,
    bottomLeftContent,
    bottomRightContent,
    tableBody,
    tableHead,
    settings,
    leftBottomSecondColumnX: 55,
  });
}

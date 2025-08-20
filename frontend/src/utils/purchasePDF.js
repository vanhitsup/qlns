
import "jspdf-autotable";
import moment from "moment";
import invoiceGenerator from "./invoiceGenerator";
import numberToWords from "./numberToWords";

export default function purchasePDF(data, companyInfo ,title ,currencyName) {
  
  

  const getNumber = (data) => {
    if (data?.discount) {
      return parseInt(data.totalAmount - data.discount);
    }
    else {
      return parseInt(data.totalAmount);
    }
  }
  const numberInText = numberToWords(
    Math.round(getNumber(data))
  );

  const {
    status,
    totalPaidAmount,
    totalReturnAmount,
    instantPaidReturnAmount,
    dueAmount,
    singlePurchaseInvoice,
    returnPurchaseInvoice,
    transactions,
  } = data ? data : {};

  const grandTotal = Number(
    (singlePurchaseInvoice.totalAmount || 0) +
      (singlePurchaseInvoice.totalTax || 0) -
      (totalReturnAmount || 0) +
      (instantPaidReturnAmount || 0)
  );
  const bottomLeftContent = [
    {
      label: "IN WORDS: ",
      value: `${numberInText.toUpperCase()} ${currencyName}` || "",
    },
    {
      label: "Terms And Conditions: ",
      value: data.termsAndConditions ? data.termsAndConditions : "",
    },
    {
      label: "Notes: ",
      value: singlePurchaseInvoice.note ? singlePurchaseInvoice.note : "",
    },
  ];
  const bottomRightContent = [
    {
      label: "Total Amount:",
      value: ` ${singlePurchaseInvoice.totalAmount.toFixed(2)}`,
    },
    {
      label: "Total Tax:",
      value: ` ${singlePurchaseInvoice.totalTax.toFixed(2)}`,
    },
    data.totalReturnAmount && {
      label: "Return Product Value:",
      value: ` ${
        data.totalReturnAmount ? data.totalReturnAmount.toFixed(2) : 0
      }`,
    },
    data.instantPaidReturnAmount && {
      label: "Return Amount:",
      value: `${
        data.instantPaidReturnAmount
          ? data.instantPaidReturnAmount.toFixed(2)
          : 0
      }`,
    },
    {
      label: "Grand Total:",
      value: ` ${grandTotal.toFixed(2)}`,
      style: { borderTop: true },
    },
    {
      label: "Total Paid Amount:",
      value: ` ${totalPaidAmount.toFixed(2)}`,
    },
    {
      label: "Due Amount:",
      value: ` ${dueAmount.toFixed(2)}`,
      style: { borderTop: true },
    },
  ];

  const tableHead = ["SL", "Name", "Quantity", "Price", "Amount", "Tax"];

  const tableBody = singlePurchaseInvoice?.purchaseInvoiceProduct?.map(
    (item, index) => [
      index + 1,
      item.product.name,
      item.productQuantity,
      ` ${item.productUnitPurchasePrice}`,
      ` ${item.productFinalAmount}`,
      ` ${item.tax}`,
    ]
  );
  const customerInfo = [
    {
      value: `Supplier Id: ${singlePurchaseInvoice?.supplierId}`,
    },
    {
      value: `Supplier Name: ${singlePurchaseInvoice?.supplier?.name}`,
    },
    {
      value: `Address: ${singlePurchaseInvoice?.supplier?.address}`,
    },
    {
      value: `Contact No: ${singlePurchaseInvoice?.supplier?.phone}`,
    },
  ];
  const TopRightInfo = [
    {
      value: `Invoice No: ${singlePurchaseInvoice?.id}`,
    },
    {
      value: `Invoice Date: ${moment(data?.date).format("YYYY-MM-DD")}`,
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
    bottomLeftFontSize: 8,
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
            settings
          })
}

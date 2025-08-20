import moment from "moment";
import invoiceGenerator from "./invoiceGenerator";
import numberToWords from "./numberToWords";

export default function salePDF(data, companyInfo, title, currencyName) {
  const numberInText = numberToWords(
    Math.round(
      data.singleSaleInvoice.totalAmount +
        data?.singleSaleInvoice.totalTaxAmount
    )
  );
  const calculatedTotalAmount =
    (data.singleSaleInvoice.totalAmount || 0) +
    (data.singleSaleInvoice.totalDiscountAmount || 0);

  const calculatedGrandTotal =
    (data.singleSaleInvoice.totalAmount || 0) +
    (data?.singleSaleInvoice?.totalTaxAmount || 0) -
    (data.totalReturnAmount || 0) +
    (data.instantPaidReturnAmount || 0);

  const bottomLeftContent = [
    {
      label: "IN WORDS: ",
      value: `${numberInText.toUpperCase()} ${currencyName}` || "",
    },
    {
      label: "Terms And Conditions: ",
      value: data?.singleSaleInvoice?.termsAndConditions
        ? data.singleSaleInvoice.termsAndConditions
        : "",
    },
    {
      label: "Notes: ",
      value: data?.singleSaleInvoice?.note ? data.singleSaleInvoice.note : "",
    },
  ];

  const bottomRightContent = [
    {
      label: "Total Amount:",
      value: `${
        data?.totalAmount ? Number(calculatedTotalAmount).toFixed(2) : 0
      }`,
    },
    {
      label: "Discount",
      value: `${
        data?.singleSaleInvoice.totalDiscountAmount
          ? Number(data.singleSaleInvoice.totalDiscountAmount).toFixed(2)
          : 0
      }`,
    },
    {
      label: "Total Tax:",
      value: `${
        data?.singleSaleInvoice?.totalTaxAmount
          ? Number(data.singleSaleInvoice.totalTaxAmount).toFixed(2)
          : 0
      }`,
    },

    data.totalReturnAmount && {
      label: "Return product value:",
      value: `${
        data.totalReturnAmount ? Number(data.totalReturnAmount).toFixed(2) : 0
      }`,
    },
    data.instantPaidReturnAmount && {
      label: "Return Amount:",
      value: `${
        data.instantPaidReturnAmount
          ? Number(data.instantPaidReturnAmount).toFixed(2)
          : 0
      }`,
    },

    data.totalAmount && {
      label: "Grand Total:",
      value: `${
        data.totalAmount ? Number(calculatedGrandTotal).toFixed(2) : 0
      }`,
      style: { borderTop: true },
    },
    {
      label: "Paid Amount:",
      value: `${
        data.totalPaidAmount ? Number(data.totalPaidAmount).toFixed(2) : 0
      }`,
    },
    {
      label: "Due Amount:",
      value: `${data.dueAmount.toFixed(2)}`,
      style: { borderTop: true },
    },
  ];
  const tableHead = [
    "SL",
    "Product Description",
    "Quantity",
    "Unit Price",
    "Total Price",
    "Tax",
  ];

  const tableBody = data.singleSaleInvoice.saleInvoiceProduct.map(
    (item, index) => [
      index + 1,
      item.product.name,
      item.productQuantity,
      `${item.productUnitSalePrice}`,
      `${item.productUnitSalePrice * item.productQuantity}`,
      `${item.taxAmount ? item.taxAmount : 0}`,
    ]
  );
  const customerInfo = [
    {
      value: `Client Name: ${data?.singleSaleInvoice?.customer?.username}`,
    },
    {
      value: `Address: ${
        data?.singleSaleInvoice?.customer?.address
          ? data?.singleSaleInvoice?.customer?.address
          : ""
      }`,
    },
    {
      value: `Contact No: ${data?.singleSaleInvoice?.customer?.phone}`,
    },
  ];
  const TopRightInfo = [
    {
      value: ` Invoice No: ${data?.singleSaleInvoice?.id}`,
    },
    {
      value: `Invoice Date: ${moment(data?.singleSaleInvoice?.date).format(
        "YYYY-MM-DD"
      )}`,
    },
    {
      value: `Currency: ${currencyName}`,
    },
  ];
  if (data?.dueDate) {
    TopRightInfo.splice(2, 0, {
      value: `Due Date: ${moment(data?.singleSaleInvoice?.dueDate).format(
        "YYYY-MM-DD"
      )}`,
    });
  }
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
    leftBottomSecondColumnX: 28,
  });
}

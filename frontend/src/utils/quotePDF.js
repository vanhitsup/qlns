import moment from "moment";
import invoiceGenerator from "./invoiceGenerator";
import numberToWords from "./numberToWords";

export default function quotePDF(data, companyInfo, title, currencyName) {
    const numberInText = numberToWords(
        Math.round(
          data.totalAmount -
            data?.discount
        )
      );
  

  const bottomLeftContent = [
    {
      label: "IN WORDS: ",
      value: `${numberInText.toUpperCase()} ${currencyName}` || "",
    },
    {
      label: "Terms And Conditions: ",
      value: data?.termsAndConditions
        ? data.termsAndConditions
        : "",
    },
  ];

  const bottomRightContent = [
    {
      label: "Total Amount:",
      value: `${
        data?.totalAmount ? Number(data.totalAmount).toFixed(2) : 0
      }`,
    },
    {
      label: "Total discount:",
      value: `${
        data?.discount ? Number(data.discount).toFixed(2) : 0
      }`,
    },
   
  ];
  const tableHead = [
    "SL",
    "Product Name",
    "Quantity",
    "Unit Price",
    "Total Price",
  ];

  const tableBody = data.quoteProduct.map(
    (item, index) => [
      index + 1,
      item.product.name,
      item.productQuantity,
      item.unitPrice,
      `${item.unitPrice * item.productQuantity}`
    ]
  );
  const customerInfo = [
    {
      value: `Quote Owner: ${data?.quoteOwner.username}`,
    },
    {
        value: `Quote Date: ${moment(data.quoteDate).format("ll")}`,
      },
  ];
  const TopRightInfo = [
    {
        value: `Quote Name: ${data?.quoteName}`,
      },
      {
          value: `Quote Stage: ${data.quoteStage.quoteStageName}`,
        },
      {
        value: `Expiration Date: ${moment(data.data?.expirationDate).format("ll")}`,
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
    leftBottomSecondColumnX: 45,
  });
}

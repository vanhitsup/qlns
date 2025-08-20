
import "jspdf-autotable";
import moment from "moment";
import invoiceGenerator from "./invoiceGenerator";

export default function purchaseOrderPDF(data, companyInfo ,title ,currencyName) {
 
  const bottomLeftContent = [];
  const bottomRightContent = [];

  const tableHead = ["SI", "Product Name", "Quantity"];

  const tableBody = data.productList.map((item, index) => [
    index + 1,
    item.product.name,
    item.reorderProductQuantity,
  ]);

  const customerInfo = [];
  const TopRightInfo = [
    {
      value: `Invoice No: ${data?.reorderInvoiceId}`,
    },
    {
      value: `Invoice Date: ${moment(data?.createdAt).format("YYYY-MM-DD")}`,
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
